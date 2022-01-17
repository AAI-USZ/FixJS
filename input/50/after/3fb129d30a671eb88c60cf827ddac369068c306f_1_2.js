function(node) {

          // Say this node is loaded.
          node.loaded = true;

          // Add to the loaded nodes array.
          loadedNodes[node.id] = node.id;

          // Build the node.
          node.build();

          // Callback that we are loaded.
          if (callback) {
            callback(node);
          }

          // Say we are not busy.
          node.setBusy(false);
        }