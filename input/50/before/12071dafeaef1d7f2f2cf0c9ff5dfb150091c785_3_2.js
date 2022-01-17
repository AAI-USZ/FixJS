function(node) {
          return function(event) {

            // Determine if the input is checked.
            var checked = $(event.target).is(':checked');

            // Expand if checked.
            node.expand(checked);

            // Call the select method.
            node.select(checked);
          };
        }