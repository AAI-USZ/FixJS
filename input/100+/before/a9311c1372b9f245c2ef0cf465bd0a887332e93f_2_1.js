function(node, isRoot) {

          // Get the existing choices.
          var selected_choice = $('li#choice_' + node.id, choices);

          // Only add if this node is valid.
          if (node.id) {

            // Add the choice if not already added.
            if (node.checked && (selected_choice.length == 0)) {

              // Get and add a new choice.
              var choice = $(document.createElement('li'));
              choice.addClass('search-choice');
              choice.attr('id', 'choice_' + node.id);

              // Add the node data to this choice.
              choice.eq(0)[0].nodeData = node;

              var span = $(document.createElement('span'));
              span.text(node.title);

              // Don't allow them to remove the root element.
              if (!isRoot) {
                var close = $(document.createElement('a'));
                close.addClass('search-choice-close');
                close.attr('href', 'javascript:void(0)');

                // Bind when someone clicks on the close button.
                close.bind('click', function(event) {

                  // Prevent the default.
                  event.preventDefault();

                  // Remove the choice.
                  $('li#choice_' + node.id, choices).remove();

                  // Deselect this node.
                  node.select(false);
                });
              }

              // Add this to the choices.
              search.before(choice.append(span).append(close));
            }
            else if (!node.checked) {

              // If not selected, then remove the choice.
              selected_choice.remove();
            }
          }

          // Make sure we don't do this often for performance.
          if (isRoot) {

            // Get all of the nodes that are selected.
            var nodes = [];
            chosentree.value = {};

            // Show the choices.
            choices.show();

            // Don't show the default value if the root has not children.
            if (input && node.children.length == 0) {
              input.attr({'value': ''});
            }

            // Add the selected items to the choices.
            $('li.search-choice', choices).each(function() {
              chosentree.value[this.nodeData.id] = this.nodeData.value;
              nodes.push(this.nodeData);
            });

            // Show more or less.
            if (jQuery.fn.moreorless) {

              // Add this to the choices.
              var more_text = params.more_text.replace('%num%', nodes.length);
              choices.moreorless(params.min_height, more_text);
              if (!choices.div_expanded) {
                showTree(true, null);
              }
            }

            // If they wish to know when it is loaded.
            if (treeparams.loaded) {

              // Call our callback with all the nodes.
              treeparams.loaded(nodes);
            }

            // Trigger an event.
            $(chosentree).trigger('treeloaded');
          }
        }