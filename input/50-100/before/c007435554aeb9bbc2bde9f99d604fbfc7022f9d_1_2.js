function() {
                  __executeAllCallbacksWithError(parent, err);
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
                }