function() {
                parent.emit("fullsetup");
                // Emit all servers done
                replSetSelf.emit("fullsetup")
              }