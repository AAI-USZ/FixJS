function(node) {

        // If this node is checked, then check it.
        if (node.checked) {
          node.select(node.checked);
        }

        // Expand this root node.
        node.expand(true);

        // Now set the defaults.
        node.setDefault(params.default_value);
      }