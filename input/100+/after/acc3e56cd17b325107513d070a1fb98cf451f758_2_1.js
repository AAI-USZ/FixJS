function(nodes, searchResults) {

                    // Say we are no longer searching...
                    input.removeClass('searching');

                    // If the old value is different than the new value.
                    if (inputValue != oldValue) {

                      // Run the search with the new value.
                      inputSearch();
                    }
                    else {

                      // Iterate over the nodes and append them to the search.
                      var count = 0;
                      root.childlist.children().detach();

                      // Add a class to distinguish if this is search results.
                      if (searchResults) {
                        root.childlist.addClass('chzntree-search-results');
                      }
                      else {
                        root.childlist.removeClass('chzntree-search-results');
                      }

                      // Iterate through our nodes.
                      for (var i in nodes) {
                        count++;

                        // Use either the search item or the display.
                        if (searchResults) {
                          root.childlist.append(nodes[i].searchItem);
                        }
                        else {
                          root.childlist.append(nodes[i].display);
                        }
                      }

                      if (!count) {
                        var txt = '<li>' + params.no_results_text + '</li>';
                        root.childlist.append(txt);
                      }
                    }
                  }