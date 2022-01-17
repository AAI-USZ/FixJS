function(text, callback) {
      // If no text was provided, then just return the root children.
      if (!text) {
        if (callback) {
          callback(this.children);
        }
      }
      else {

        // Initialize our results.
        var results = {};

        // Convert the text to lowercase.
        text = text.toLowerCase();

        // Load all nodes.
        this.loadAll(function(node) {

          // Callback with the results of this search.
          if (callback) {
            callback(results);
          }
        }, function(node) {

          // If we are not the root node, and the text matches the title.
          if (!node.root && node.title.toLowerCase().search(text) !== -1) {

            // Add this to our search results.
            results[node.id] = node;
          }
        }, true);
      }
    }