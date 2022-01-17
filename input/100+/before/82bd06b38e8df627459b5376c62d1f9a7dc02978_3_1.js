function(dbInstance, options, callback) {
  if('function' === typeof options) callback = options, options = {};
  if(options == null) options = {};
  if(!('function' === typeof callback)) callback = null;

  // Currently needed to work around problems with multiple connections in a pool with ssl
  // TODO fix if possible
  if(this.ssl == true) {
    // Set up socket options for ssl
    this.socketOptions.ssl = true;
  }

  // Let's connect
  var server = this;
  // Let's us override the main receiver of events
  var eventReceiver = options.eventReceiver != null ? options.eventReceiver : this;
  // Creating dbInstance
  this.dbInstance = dbInstance;
  // Save reference to dbInstance
  this.dbInstances = [dbInstance];

  // Set server state to connecting
  this._serverState = 'connecting';
  // Ensure dbInstance can do a slave query if it's set
  dbInstance.slaveOk = this.slaveOk ? this.slaveOk : dbInstance.slaveOk;
  // Create connection Pool instance with the current BSON serializer
  var connectionPool = new ConnectionPool(this.host, this.port, this.poolSize, dbInstance.bson,  this.socketOptions);
  // Set logger on pool
  connectionPool.logger = this.logger;

  // Set up a new pool using default settings
  server.connectionPool = connectionPool;

  // Set basic parameters passed in
  var returnIsMasterResults = options.returnIsMasterResults == null ? false : options.returnIsMasterResults;

  // Create a default connect handler, overriden when using replicasets
  var connectCallback = function(err, reply) {
    // ensure no callbacks get called twice
    var internalCallback = callback;
    callback = null;
    // If something close down the connection and removed the callback before
    // proxy killed connection etc, ignore the erorr as close event was isssued
    if(err != null && internalCallback == null) return;
    // Internal callback
    if(err != null) return internalCallback(err, null);
    server.master = reply.documents[0].ismaster == 1 ? true : false;
    server.connectionPool.setMaxBsonSize(reply.documents[0].maxBsonObjectSize);
    // Set server as connected
    server.connected = true;
    // Save document returned so we can query it
    server.isMasterDoc = reply.documents[0];
    // If we have it set to returnIsMasterResults
    if(returnIsMasterResults) {
      internalCallback(null, reply);
    } else {
      internalCallback(null, dbInstance);
    }
  };

  // Let's us override the main connect callback
  var connectHandler = options.connectHandler == null ? connectCallback : options.connectHandler;

  // Set up on connect method
  connectionPool.on("poolReady", function() {
    // Create db command and Add the callback to the list of callbacks by the request id (mapping outgoing messages to correct callbacks)
    var db_command = DbCommand.NcreateIsMasterCommand(dbInstance, dbInstance.databaseName);
    // Check out a reader from the pool
    var connection = connectionPool.checkoutConnection();
    // Set server state to connected
    server._serverState = 'connected';

    // Register handler for messages
    dbInstance._registerHandler(db_command, false, connection, connectHandler);

    // Write the command out
    connection.write(db_command);
  })

  // Set up item connection
  connectionPool.on("message", function(message) {
    // Attempt to parse the message
    try {
      // Create a new mongo reply
      var mongoReply = new MongoReply()
      // Parse the header
      mongoReply.parseHeader(message, connectionPool.bson)
      // If message size is not the same as the buffer size
      // something went terribly wrong somewhere
      if(mongoReply.messageLength != message.length) {
        // Emit the error
        if(eventReceiver.listeners("error") && eventReceiver.listeners("error").length > 0) eventReceiver.emit("error", new Error("bson length is different from message length"), server);
        // Remove all listeners
        server.removeAllListeners();
      } else {
        var startDate = new Date().getTime();

        // Callback instance
        var callbackInfo = null;
        var dbInstanceObject = null;

        // Locate a callback instance and remove any additional ones
        for(var i = 0; i < server.dbInstances.length; i++) {
          var dbInstanceObjectTemp = server.dbInstances[i];
          var hasHandler = dbInstanceObjectTemp._hasHandler(mongoReply.responseTo.toString());
          // Assign the first one we find and remove any duplicate ones
          if(hasHandler && callbackInfo == null) {
            callbackInfo = dbInstanceObjectTemp._findHandler(mongoReply.responseTo.toString());
            dbInstanceObject = dbInstanceObjectTemp;
          } else if(hasHandler) {
            dbInstanceObjectTemp._removeHandler(mongoReply.responseTo.toString());
          }
        }

        // Only execute callback if we have a caller
        if(callbackInfo.callback && Array.isArray(callbackInfo.info.chained)) {
          // Check if callback has already been fired (missing chain command)
          var chained = callbackInfo.info.chained;
          var numberOfFoundCallbacks = 0;
          for(var i = 0; i < chained.length; i++) {
            if(dbInstanceObject._hasHandler(chained[i])) numberOfFoundCallbacks++;
          }

          // If we have already fired then clean up rest of chain and move on
          if(numberOfFoundCallbacks != chained.length) {
            for(var i = 0; i < chained.length; i++) {
              dbInstanceObject._removeHandler(chained[i]);
            }

            // Just return from function
            return;
          }

          // Parse the body
          mongoReply.parseBody(message, connectionPool.bson, callbackInfo.info.raw, function(err) {
            if(err != null) {
              // If pool connection is already closed
              if(server._serverState === 'disconnected') return;
              // Set server state to disconnected
              server._serverState = 'disconnected';
              // Remove all listeners and close the connection pool
              server.removeAllListeners();
              connectionPool.stop(true);

              // If we have a callback return the error
              if(typeof callback === 'function') {
                // ensure no callbacks get called twice
                var internalCallback = callback;
                callback = null;
                // Perform callback
                internalCallback(new Error("connection closed due to parseError"), null);
              } else if(server.isSetMember()) {
                if(server.listeners("parseError") && server.listeners("parseError").length > 0) server.emit("parseError", new Error("connection closed due to parseError"), server);
              } else {
                if(eventReceiver.listeners("parseError") && eventReceiver.listeners("parseError").length > 0) eventReceiver.emit("parseError", new Error("connection closed due to parseError"), server);
              }

              // If we are a single server connection fire errors correctly
              if(!server.isSetMember()) {
                // Fire all callback errors
                _fireCallbackErrors(server, new Error("connection closed due to parseError"));
                // Emit error
                _emitAcrossAllDbInstances(server, eventReceiver, "parseError", server);
              }
              // Short cut
              return;
            }

            // Fetch the callback
            var callbackInfo = dbInstanceObject._findHandler(mongoReply.responseTo.toString());
            // If we have an error let's execute the callback and clean up all other
            // chained commands
            var firstResult = mongoReply && mongoReply.documents;
            // Check for an error, if we have one let's trigger the callback and clean up
            // The chained callbacks
            if(firstResult[0].err != null || firstResult[0].errmsg != null) {
              // Trigger the callback for the error
              dbInstanceObject._callHandler(mongoReply.responseTo, mongoReply, null);
            } else {
              var chainedIds = callbackInfo.info.chained;

              if(chainedIds.length > 0 && chainedIds[chainedIds.length - 1] == mongoReply.responseTo) {
                // Cleanup all other chained calls
                chainedIds.pop();
                // Remove listeners
                for(var i = 0; i < chainedIds.length; i++) dbInstanceObject._removeHandler(chainedIds[i]);
                // Call the handler
                dbInstanceObject._callHandler(mongoReply.responseTo, callbackInfo.info.results.shift(), null);
              } else{
                // Add the results to all the results
                for(var i = 0; i < chainedIds.length; i++) {
                  var handler = dbInstanceObject._findHandler(chainedIds[i]);
                  // Check if we have an object, if it's the case take the current object commands and
                  // and add this one
                  if(handler.info != null) {
                    handler.info.results = Array.isArray(callbackInfo.info.results) ? callbackInfo.info.results : [];
                    handler.info.results.push(mongoReply);
                  }
                }
              }
            }
          });
        } else if(callbackInfo.callback) {
          // Parse the body
          mongoReply.parseBody(message, connectionPool.bson, callbackInfo.info.raw, function(err) {
            if(err != null) {
              // If pool connection is already closed
              if(server._serverState === 'disconnected') return;
              // Set server state to disconnected
              server._serverState = 'disconnected';
              // Remove all listeners and close the connection pool
              server.removeAllListeners();
              connectionPool.stop(true);

              // If we have a callback return the error
              if(typeof callback === 'function') {
                // ensure no callbacks get called twice
                var internalCallback = callback;
                callback = null;
                // Perform callback
                internalCallback(new Error("connection closed due to parseError"), null);
              } else if(server.isSetMember()) {
                if(server.listeners("parseError") && server.listeners("parseError").length > 0) server.emit("parseError", new Error("connection closed due to parseError"), server);
              } else {
                if(eventReceiver.listeners("parseError") && eventReceiver.listeners("parseError").length > 0) eventReceiver.emit("parseError", new Error("connection closed due to parseError"), server);
              }

              // If we are a single server connection fire errors correctly
              if(!server.isSetMember()) {
                // Fire all callback errors
                _fireCallbackErrors(server, new Error("connection closed due to parseError"));
                // Emit error
                _emitAcrossAllDbInstances(server, eventReceiver, "parseError", server);
              }
              // Short cut
              return;
            }

            // Let's record the stats info if it's enabled
            if(server.recordQueryStats == true && server._state['runtimeStats'] != null
              && server._state.runtimeStats['queryStats'] instanceof RunningStats) {
              // Add data point to the running statistics object
              server._state.runtimeStats.queryStats.push(new Date().getTime() - callbackInfo.info.start);
            }

            // Trigger the callback
            dbInstanceObject._callHandler(mongoReply.responseTo, mongoReply, null);
          });
        }
      }
    } catch (err) {
      // Throw error in next tick
      process.nextTick(function() {
        throw err;
      })
    }
  });

  // Handle timeout
  connectionPool.on("timeout", function(err) {
    // If pool connection is already closed
    if(server._serverState === 'disconnected') return;
    // Set server state to disconnected
    server._serverState = 'disconnected';
    // If we have a callback return the error
    if(typeof callback === 'function') {
      // ensure no callbacks get called twice
      var internalCallback = callback;
      callback = null;
      // Perform callback
      internalCallback(err, null);
    } else if(server.isSetMember()) {
      if(server.listeners("timeout") && server.listeners("timeout").length > 0) server.emit("timeout", err, server);
    } else {
      if(eventReceiver.listeners("timeout") && eventReceiver.listeners("timeout").length > 0) eventReceiver.emit("timeout", err, server);
    }

    // If we are a single server connection fire errors correctly
    if(!server.isSetMember()) {
      // Fire all callback errors
      _fireCallbackErrors(server, err);
      // Emit error
      _emitAcrossAllDbInstances(server, eventReceiver, "timeout", err, server);
    }
  });

  // Handle errors
  connectionPool.on("error", function(message) {
    // If pool connection is already closed
    if(server._serverState === 'disconnected') return;
    // Set server state to disconnected
    server._serverState = 'disconnected';
    // If we have a callback return the error
    if(typeof callback === 'function') {
      // ensure no callbacks get called twice
      var internalCallback = callback;
      callback = null;
      // Perform callback
      internalCallback(new Error(message && message.err ? message.err : message), null);
    } else if(server.isSetMember()) {
      if(server.listeners("error") && server.listeners("error").length > 0) server.emit("error", new Error(message && message.err ? message.err : message), server);
    } else {
      if(eventReceiver.listeners("error") && eventReceiver.listeners("error").length > 0) eventReceiver.emit("error", new Error(message && message.err ? message.err : message), server);
    }

    // If we are a single server connection fire errors correctly
    if(!server.isSetMember()) {
      // Fire all callback errors
      _fireCallbackErrors(server, new Error(message && message.err ? message.err : message));
      // Emit error
      _emitAcrossAllDbInstances(server, eventReceiver, "error", new Error(message && message.err ? message.err : message), server);
    }
  });

  // Handle close events
  connectionPool.on("close", function() {
    // If pool connection is already closed
    if(server._serverState === 'disconnected') return;
    // Set server state to disconnected
    server._serverState = 'disconnected';
    // If we have a callback return the error
    if(typeof callback == 'function') {
      // ensure no callbacks get called twice
      var internalCallback = callback;
      callback = null;
      // Perform callback
      internalCallback(new Error("connection closed"), null);
    } else if(server.isSetMember()) {
      if(server.listeners("close") && server.listeners("close").length > 0) server.emit("close", new Error("connection closed"), server);
    } else {
      if(eventReceiver.listeners("close") && eventReceiver.listeners("close").length > 0) eventReceiver.emit("close", new Error("connection closed"), server);
    }

    // If we are a single server connection fire errors correctly
    if(!server.isSetMember()) {
      // Fire all callback errors
      _fireCallbackErrors(server, new Error("connection closed"));
      // Emit error
      _emitAcrossAllDbInstances(server, eventReceiver, "close", server);
    }
  });

  // If we have a parser error we are in an unknown state, close everything and emit
  // error
  connectionPool.on("parseError", function(message) {
    // If pool connection is already closed
    if(server._serverState === 'disconnected') return;
    // Set server state to disconnected
    server._serverState = 'disconnected';
    // // Close the pool
    // connectionPool.stop();
    // If we have a callback return the error
    if(typeof callback === 'function') {
      // ensure no callbacks get called twice
      var internalCallback = callback;
      callback = null;
      // Perform callback
      internalCallback(new Error("connection closed due to parseError"), null);
    } else if(server.isSetMember()) {
      if(server.listeners("parseError") && server.listeners("parseError").length > 0) server.emit("parseError", new Error("connection closed due to parseError"), server);
    } else {
      if(eventReceiver.listeners("parseError") && eventReceiver.listeners("parseError").length > 0) eventReceiver.emit("parseError", new Error("connection closed due to parseError"), server);
    }

    // If we are a single server connection fire errors correctly
    if(!server.isSetMember()) {
      // Fire all callback errors
      _fireCallbackErrors(server, new Error("connection closed due to parseError"));
      // Emit error
      _emitAcrossAllDbInstances(server, eventReceiver, "parseError", server);
    }
  });

  // Boot up connection poole, pass in a locator of callbacks
  connectionPool.start();
}