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
                _emitAcrossAllDbInstances(server, eventReceiver, "parseError", server, null, true);
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
          }