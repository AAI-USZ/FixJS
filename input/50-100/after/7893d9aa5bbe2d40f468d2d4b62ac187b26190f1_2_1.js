function(node) {

        if (node.children.length == 0) {

          // If the root node does not have any children, then hide.
          node.display.hide();
        }

        // If this node is checked, then check it.
        if (node.checked) {
          node.select(node.checked);
        }

        // Expand this root node.
        node.expand(true);

        // Now set the defaults.
        node.setDefault(params.default_value);
      }