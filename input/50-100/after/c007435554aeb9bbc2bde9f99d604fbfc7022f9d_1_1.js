function() {
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
                }