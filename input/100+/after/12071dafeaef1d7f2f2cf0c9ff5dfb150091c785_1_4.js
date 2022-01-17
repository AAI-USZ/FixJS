function() {

      // Get the tree node parameters.
      var treeParams = $.extend(params, {display: $(this)});

      // Create a root tree node and load it.
      var root = new TreeNode(treeParams, true);

      // Add a select all link.
      var selectAll = root.getSelectAll();
      if (selectAll !== false) {

        // Create an input that will select all children if selected.
        root.display.append($(document.createElement('input')).attr({
          'type': 'checkbox'
        }).bind('click', (function(node) {
          return function(event) {
            node.selectChildren($(event.target).is(':checked'));
            if (params.selected) {
              params.selected({}, true);
            }
          };
        })(root)));

        // If they provided select all text, add it here.
        if (selectAll) {
          var span = $(document.createElement('span')).html(selectAll);
          root.display.append(span);
        }
      }

      // Load the node.
      root.loadNode(function(node) {
        if (node.checked) {
          node.select(node.checked);
        }
        node.expand(true);

        if (node.value) {
          node.check(true);
        }
      });
    }