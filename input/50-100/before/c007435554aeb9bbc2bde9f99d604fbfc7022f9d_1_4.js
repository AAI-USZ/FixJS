function(err) {
              // ensure no callbacks get called twice
              var internalCallback = callback;
              callback = null;
              // Callback
              if(typeof internalCallback == 'function') {
                internalCallback(null, parent);
              }
              // Emit all servers done
              replSetSelf.emit("fullsetup")
            }