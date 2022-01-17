function() {
                parent.emit("fullsetup", null, parent);
                // Emit all servers done
                replSetSelf.emit("fullsetup", null, parent)
              }