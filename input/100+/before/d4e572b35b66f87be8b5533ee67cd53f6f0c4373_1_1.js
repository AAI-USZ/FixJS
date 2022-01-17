function(node) {

        // See if an operation needs to be performed.
        if (operation) {
          operation(node);
        }

        // Get our children count.
        var i = node.children.length, count = i;

        // If no children, then just call the callback immediately.
        if (!i) {
          if (callback) {
            callback(node);
          }
          return;
        }

        // Make this node busy.
        if (!hideBusy) {
          node.setBusy(true);
        }

        // Iterate through each child.
        while (i--) {

          // Load this childs children...
          node.children[i].loadAll(function() {

            // Decrement the child count.
            count--;

            // If all children are done loading, call the callback.
            if (!count) {

              // Callback that we are done loading this tree.
              if (callback) {
                callback(node);
              }

              // Make this node busy.
              if (!hideBusy) {
                node.setBusy(false);
              }
            }
          }, operation, hideBusy);
        }
      }