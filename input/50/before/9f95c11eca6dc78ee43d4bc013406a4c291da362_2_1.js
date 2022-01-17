function() {
                // Emit on db parent
                parent.emit("fullsetup");
                // Emit all servers done
                replSetSelf.emit("fullsetup")
              }