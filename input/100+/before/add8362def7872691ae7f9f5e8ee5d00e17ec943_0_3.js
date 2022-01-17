function(err, result) {
      self.count = self.count + 1;

      // If we found a master call it at the end
      var masterCallback = null;

      // Remove a server from the list of intialized servers we need to perform
      self._numberOfServersLeftToInitialize = self._numberOfServersLeftToInitialize - 1;

      if(err != null) {
        self._state.errors[instanceServer.name] = instanceServer;
      }

      // Add enable query information
      instanceServer.enableRecordQueryStats(replSetSelf.recordQueryStats);

      if(err == null && result.documents[0].hosts != null) {
        // Fetch the isMaster command result
        var document = result.documents[0];
        // Break out the results
        var setName = document.setName;
        var isMaster = document.ismaster;
        var secondary = document.secondary;
        var passive = document.passive;
        var arbiterOnly = document.arbiterOnly;
        var hosts = Array.isArray(document.hosts) ? document.hosts : [];
        var arbiters = Array.isArray(document.arbiters) ? document.arbiters : [];
        var passives = Array.isArray(document.passives) ? document.passives : [];
        var tags = document.tags ? document.tags : {};
        var primary = document.primary;

        // Ensure we are keying on the same name for lookups as mongodb might return
        // dns name and the driver is using ip's
        // Rename the connection so we are keying on the name used by mongod
        var userProvidedServerString = instanceServer.host + ":" + instanceServer.port;
        var me = document.me || userProvidedServerString;

        // If we have user provided entries already, switch them to avoid additional
        // open connections
        if(replSetSelf._state['addresses'][userProvidedServerString]) {
          // Fetch server
          var server = replSetSelf._state['addresses'][userProvidedServerString];
          // Remove entry
          delete replSetSelf._state['addresses'][userProvidedServerString];
          // Remove other entries
          if(replSetSelf._state['secondaries'][userProvidedServerString]) {
            delete replSetSelf._state['secondaries'][userProvidedServerString];
            replSetSelf._state['secondaries'][me] = server;
          } else if(replSetSelf._state['passives'][userProvidedServerString]) {
            delete replSetSelf._state['passives'][userProvidedServerString];
            replSetSelf._state['passives'][me] = server;
          } else if(replSetSelf._state['arbiters'][userProvidedServerString]) {
            delete replSetSelf._state['arbiters'][userProvidedServerString];
            replSetSelf._state['arbiters'][me] = server;
          }

          // Set name of the server
          server.name = me;
          // Add the existing one to the replicaset list of addresses
          replSetSelf._state['addresses'][me] = server;
        } else {
          instanceServer.name = me;
        }

        // Only add server to our internal list if it's a master, secondary or arbiter
        if(isMaster == true || secondary == true || arbiterOnly == true) {
          // Handle a closed connection
          replSetSelf.closeHandler = function(err, server) {
            var closeServers = function() {
              // Set the state to disconnected
              parent._state = 'disconnected';
              // Shut down the replicaset for now and Fire off all the callbacks sitting with no reply
              if(replSetSelf._serverState == 'connected') {
                // Close the replicaset
                replSetSelf.close(function() {
                  __executeAllCallbacksWithError(parent, err);
                  // Set the parent
                  if(typeof parent.openCalled != 'undefined')
                    parent.openCalled = false;
                  // Ensure single callback only
                  if(callback != null) {
                    // Single callback only
                    var internalCallback = callback;
                    callback = null;
                    // Return the error
                    internalCallback(err, null);
                  } else {
                    // If the parent has listeners trigger an event
                    if(parent.listeners("close").length > 0) {
                      parent.emit("close", err);
                    }
                  }
                });
              }
            }

            // Check if this is the primary server, then disconnect otherwise keep going
            if(replSetSelf._state.master != null) {
              var primaryAddress = replSetSelf._state.master.host + ":" + replSetSelf._state.master.port;
              var errorServerAddress = server.name;

              // Only shut down the set if we have a primary server error
              if(primaryAddress == errorServerAddress) {
                closeServers();
              } else {
                // Remove from the list of servers
                delete replSetSelf._state.addresses[errorServerAddress];
                // Locate one of the lists and remove
                if(replSetSelf._state.secondaries[errorServerAddress] != null) {
                  delete replSetSelf._state.secondaries[errorServerAddress];
                } else if(replSetSelf._state.arbiters[errorServerAddress] != null) {
                  delete replSetSelf._state.arbiters[errorServerAddress];
                } else if(replSetSelf._state.passives[errorServerAddress] != null) {
                  delete replSetSelf._state.passives[errorServerAddress];
                }

                // Check if we are reading from Secondary only
                if(replSetSelf._readPreference == ReadPreference.SECONDARY && Object.keys(replSetSelf._state.secondaries).length == 0) {
                  closeServers();
                }
              }
            } else {
              closeServers();
            }
          }

          // Handle a connection timeout
          replSetSelf.timeoutHandler = function(err, server) {
            var closeServers = function() {
              // Set the state to disconnected
              parent._state = 'disconnected';
              // Shut down the replicaset for now and Fire off all the callbacks sitting with no reply
              if(replSetSelf._serverState == 'connected') {
                // Close the replicaset
                replSetSelf.close(function() {
                  __executeAllCallbacksWithError(parent, err);
                  // Set the parent
                  if(typeof parent.openCalled != 'undefined')
                    parent.openCalled = false;
                  // Ensure single callback only
                  if(callback != null) {
                    // Single callback only
                    var internalCallback = callback;
                    callback = null;
                    // Return the error
                    internalCallback(new Error("connection timed out"), null);
                  } else {
                    // If the parent has listeners trigger an event
                    if(parent.listeners("error").length > 0) {
                      parent.emit("timeout", new Error("connection timed out"));
                    }
                  }
                });
              }
            }

            // Check if this is the primary server, then disconnect otherwise keep going
            if(replSetSelf._state.master != null) {
              var primaryAddress = replSetSelf._state.master.host + ":" + replSetSelf._state.master.port;
              var errorServerAddress = server.name;

              // Only shut down the set if we have a primary server error
              if(primaryAddress == errorServerAddress) {
                closeServers();
              } else {
                // Remove from the list of servers
                delete replSetSelf._state.addresses[errorServerAddress];
                // Locate one of the lists and remove
                if(replSetSelf._state.secondaries[errorServerAddress] != null) {
                  delete replSetSelf._state.secondaries[errorServerAddress];
                } else if(replSetSelf._state.arbiters[errorServerAddress] != null) {
                  delete replSetSelf._state.arbiters[errorServerAddress];
                } else if(replSetSelf._state.passives[errorServerAddress] != null) {
                  delete replSetSelf._state.passives[errorServerAddress];
                }

                // Check if we are reading from Secondary only
                if(replSetSelf._readPreference == ReadPreference.SECONDARY && Object.keys(replSetSelf._state.secondaries).length == 0) {
                  closeServers();
                }
              }
            } else {
              closeServers();
            }
          }

          // Handle an error
          replSetSelf.errorHandler = function(err, server) {
            var closeServers = function() {
              // Set the state to disconnected
              parent._state = 'disconnected';
              // Shut down the replicaset for now and Fire off all the callbacks sitting with no reply
              if(replSetSelf._serverState == 'connected') {
                // Close the replicaset
                replSetSelf.close(function() {
                  __executeAllCallbacksWithError(parent, err);
                  // Set the parent
                  if(typeof parent.openCalled != 'undefined')
                    parent.openCalled = false;
                  // Ensure single callback only
                  if(callback != null) {
                    // Single callback only
                    var internalCallback = callback;
                    callback = null;
                    // Return the error
                    internalCallback(err, null);
                  } else {
                    // If the parent has listeners trigger an event
                    if(parent.listeners("error").length > 0) {
                      parent.emit("error", err);
                    }
                  }
                });
              }
            }

            // Check if this is the primary server, then disconnect otherwise keep going
            if(replSetSelf._state.master != null) {
              var primaryAddress = replSetSelf._state.master.host + ":" + replSetSelf._state.master.port;
              var errorServerAddress = server.name;
              // Only shut down the set if we have a primary server error
              if(primaryAddress == errorServerAddress) {
                closeServers();
              } else {
                // Remove from the list of servers
                delete replSetSelf._state.addresses[errorServerAddress];
                // Locate one of the lists and remove
                if(replSetSelf._state.secondaries[errorServerAddress] != null) {
                  delete replSetSelf._state.secondaries[errorServerAddress];
                } else if(replSetSelf._state.arbiters[errorServerAddress] != null) {
                  delete replSetSelf._state.arbiters[errorServerAddress];
                } else if(replSetSelf._state.passives[errorServerAddress] != null) {
                  delete replSetSelf._state.passives[errorServerAddress];
                }

                // Check if we are reading from Secondary only
                if(replSetSelf._readPreference == ReadPreference.SECONDARY && Object.keys(replSetSelf._state.secondaries).length == 0) {
                  closeServers();
                }
              }
            } else {
              closeServers();
            }
          }

          // Ensure we don't have duplicate handlers
          instanceServer.removeAllListeners("close");
          instanceServer.removeAllListeners("error");
          instanceServer.removeAllListeners("timeout");

          // Add error handler to the instance of the server
          instanceServer.on("close", replSetSelf.closeHandler);
          // Add error handler to the instance of the server
          instanceServer.on("error", replSetSelf.errorHandler);
          // instanceServer.on("timeout", errorHandler);
          instanceServer.on("timeout", replSetSelf.timeoutHandler);
          // Add tag info
          instanceServer.tags = tags;

          // Remove from error list
          delete replSetSelf._state.errors[me];

          // Add our server to the list of finished servers
          replSetSelf._state.addresses[me] = instanceServer;

          // Assign the set name
          if(replSetSelf.replicaSet == null) {
            replSetSelf._state.setName = setName;
          } else if(replSetSelf.replicaSet != setName && replSetSelf._serverState != 'disconnected') {
            replSetSelf._state.errorMessages.push(new Error("configured mongodb replicaset does not match provided replicaset [" + setName + "] != [" + replSetSelf.replicaSet + "]"));
            // Set done
            replSetSelf._serverState = 'disconnected';
            // ensure no callbacks get called twice
            var internalCallback = callback;
            callback = null;
            // Return error message ignoring rest of calls
            return internalCallback(replSetSelf._state.errorMessages[0], parent);
          }

          // Let's add the server to our list of server types
          if(secondary == true && (passive == false || passive == null)) {
            replSetSelf._state.secondaries[me] = instanceServer;
          } else if(arbiterOnly == true) {
            replSetSelf._state.arbiters[me] = instanceServer;
          } else if(secondary == true && passive == true) {
            replSetSelf._state.passives[me] = instanceServer;
          } else if(isMaster == true) {
            replSetSelf._state.master = instanceServer;
            masterCallback = callback == null ? null : callback;
            callback = null;
          } else if(isMaster == false && primary != null && replSetSelf._state.addresses[primary]) {
            replSetSelf._state.master = replSetSelf._state.addresses[primary];
            masterCallback = callback == null ? null : callback;
            callback = null;
          }

          // Let's go throught all the "possible" servers in the replicaset
          var candidateServers = hosts.concat(arbiters).concat(passives);

          // If we have new servers let's add them
          for(var i = 0; i < candidateServers.length; i++) {
            // Fetch the server string
            var candidateServerString = candidateServers[i];
            // Add the server if it's not defined and not already errored out
            if(null == replSetSelf._state.addresses[candidateServerString]
              && null == replSetSelf._state.errors[candidateServerString]) {
              // Split the server string
              var parts = candidateServerString.split(/:/);
              if(parts.length == 1) {
                parts = [parts[0], Connection.DEFAULT_PORT];
              }

              // Default empty socket options object
              var socketOptions = {};
              // If a socket option object exists clone it
              if(replSetSelf.socketOptions != null) {
                var keys = Object.keys(replSetSelf.socketOptions);
                for(var i = 0; i < keys.length;i++) socketOptions[keys[i]] = replSetSelf.socketOptions[keys[i]];
              }

              // Add host information to socket options
              socketOptions['host'] = parts[0];
              socketOptions['port'] = parseInt(parts[1]);
              // Set fast connect timeout
              socketOptions['connectTimeoutMS'] = replSetSelf._connectTimeoutMS

              // Create a new server instance
              var newServer = new Server(parts[0], parseInt(parts[1]), {auto_reconnect:false, 'socketOptions':socketOptions
                              , logger:replSetSelf.logger, ssl:replSetSelf.ssl, poolSize:replSetSelf.poolSize});
              // Set the replicaset instance
              newServer.replicasetInstance = replSetSelf;

              // Add handlers
              newServer.on("close", replSetSelf.closeHandler);
              newServer.on("timeout", replSetSelf.timeoutHandler);
              newServer.on("error", replSetSelf.errorHandler);

              // Add server to list, ensuring we don't get a cascade of request to the same server
              replSetSelf._state.addresses[candidateServerString] = newServer;

              // Add a new server to the total number of servers that need to initialized before we are done
              self._numberOfServersLeftToInitialize = self._numberOfServersLeftToInitialize + 1;

              // Let's set up a new server instance
              newServer.connect(parent, {returnIsMasterResults: true, eventReceiver:newServer}, self.connectionHandler(newServer));
            }
          }
        } else {
          // Remove the instance from out list of servers
          delete replSetSelf._state.addresses[me];
        }
      } else {
        instanceServer.close();
        delete replSetSelf._state.addresses[instanceServer.host + ":" + instanceServer.port];
      }

      // Check if we are ready in the next tick to allow more connections to be done
      // process.nextTick(function() {
        // Call back as we have a master letting the rest of the connections happen async
        if(masterCallback != null) {
          var internalCallback = masterCallback;
          masterCallback = null;

          // Fire open event
          process.nextTick(function() {
            // Emit the open event
            parent.emit("open", null, parent);
          });

          internalCallback(null, parent);
        }
      // });

      // If done finish up
      if((self._numberOfServersLeftToInitialize == 0) && replSetSelf._serverState === 'connecting' && replSetSelf._state.errorMessages.length == 0) {
        // Set db as connected
        replSetSelf._serverState = 'connected';
        // If we don't expect a master let's call back, otherwise we need a master before
        // the connection is successful
        if(replSetSelf.masterNotNeeded || replSetSelf._state.master != null) {
          // If we have a read strategy boot it
          if(replSetSelf.strategyInstance != null) {
            // Ensure we have a proper replicaset defined
            replSetSelf.strategyInstance.replicaset = replSetSelf;
            // Start strategy
            replSetSelf.strategyInstance.start(function(err) {
              // ensure no callbacks get called twice
              var internalCallback = callback;
              callback = null;

              // Fire open event
              process.nextTick(function() {
                // Emit on db parent
                parent.emit("fullsetup", null, parent);
                // Emit all servers done
                replSetSelf.emit("fullsetup", null, parent);
              });

              // Callback
              if(typeof internalCallback == 'function') {
                internalCallback(null, parent);
              }
            })
          } else {
            // ensure no callbacks get called twice
            var internalCallback = callback;
            callback = null;

            // Fire open event
            process.nextTick(function() {
              parent.emit("fullsetup", null, parent);
              // Emit all servers done
              replSetSelf.emit("fullsetup", null, parent);
            });

            // Callback
            if(typeof internalCallback == 'function') {
              internalCallback(null, parent);
            }
          }
        } else if(replSetSelf.readSecondary == true && Object.keys(replSetSelf._state.secondaries).length > 0) {
          // If we have a read strategy boot it
          if(replSetSelf.strategyInstance != null) {
            // Ensure we have a proper replicaset defined
            replSetSelf.strategyInstance.replicaset = replSetSelf;
            // Start strategy
            replSetSelf.strategyInstance.start(function(err) {
              // ensure no callbacks get called twice
              var internalCallback = callback;
              callback = null;

              // Fire open event
              process.nextTick(function() {
                parent.emit("fullsetup", null, parent);
                // Emit all servers done
                replSetSelf.emit("fullsetup", null, parent)
              });

              // Callback
              if(typeof internalCallback == 'function') {
                internalCallback(null, parent);
              }
            })
          } else {
            // ensure no callbacks get called twice
            var internalCallback = callback;
            callback = null;

            // Fire open event
            process.nextTick(function() {
              parent.emit("fullsetup", null, parent);
              // Emit all servers done
              replSetSelf.emit("fullsetup", null, parent);
            });

            // Callback
            if(typeof internalCallback == 'function') {
              internalCallback(null, parent);
            }
          }
        } else if(replSetSelf.readSecondary == true && Object.keys(replSetSelf._state.secondaries).length == 0) {
          replSetSelf._serverState = 'disconnected';
          // ensure no callbacks get called twice
          var internalCallback = callback;
          callback = null;
          // Force close all server instances
          replSetSelf.close();
          // Perform callback
          internalCallback(new Error("no secondary server found"), null);
        } else if(typeof callback === 'function') {
          replSetSelf._serverState = 'disconnected';
          // ensure no callbacks get called twice
          var internalCallback = callback;
          callback = null;
          // Force close all server instances
          replSetSelf.close();
          // Perform callback
          internalCallback(new Error("no primary server found"), null);
        }
      } else if((self._numberOfServersLeftToInitialize == 0) && replSetSelf._state.errorMessages.length > 0 && replSetSelf._serverState != 'disconnected') {
        // Set done
        replSetSelf._serverState = 'disconnected';
        // ensure no callbacks get called twice
        var internalCallback = callback;
        callback = null;
        // Force close all server instances
        replSetSelf.close();
        // Callback to signal we are done
        internalCallback(replSetSelf._state.errorMessages[0], null);
      }
    }