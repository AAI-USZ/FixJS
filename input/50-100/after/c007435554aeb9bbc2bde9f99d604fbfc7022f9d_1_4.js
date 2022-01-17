function(err) {
              // ensure no callbacks get called twice
              var internalCallback = callback;
              callback = null;

              // Fire open event
              process.nextTick(function() {
                // Emit on db parent
                parent.emit("fullsetup");
                // Emit all servers done
                replSetSelf.emit("fullsetup")
              });

              // Callback
              if(typeof internalCallback == 'function') {
                internalCallback(null, parent);
              }
            }