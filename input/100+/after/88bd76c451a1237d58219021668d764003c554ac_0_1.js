function(err) {
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
                internalCallback(new Error("connection closed due to parseError"), null, server);
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
                _emitAcrossAllDbInstances(server, eventReceiver, "parseError", server, null, true);
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
          }