function(defaults) {

      // Make sure the defaults is set.
      if (!jQuery.isEmptyObject(defaults)) {

        // Make sure we are loaded first.
        this.loadNode(function(node) {

          // If this default is set, then check it.
          if (defaults.hasOwnProperty(node.value) ||
              defaults.hasOwnProperty(node.id)) {

            // Check this node.
            node.check(true);
          }

          // Iterate through all the children and set their defaults.
          var i = node.children.length;
          while (i--) {

            // Set this childs default value.
            node.children[i].setDefault(defaults);
          }
        });
      }
    }