function(err) {
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
            }