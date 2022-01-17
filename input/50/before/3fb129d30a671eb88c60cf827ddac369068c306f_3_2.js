function(node) {

          // Say this node is loaded.
          node.loaded = true;

          // Build the node.
          node.build();

          // Callback that we are loaded.
          if (callback) {
            callback(node);
          }

          // Say we are not busy.
          node.setBusy(false);
        }