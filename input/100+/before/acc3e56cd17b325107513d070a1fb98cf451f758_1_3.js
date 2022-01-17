function(nodes) {

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
                      for (var i in nodes) {
                        count++;
                        root.childlist.append(nodes[i].display);
                      }

                      if (!count) {
                        var txt = '<li>' + params.no_results_text + '</li>';
                        root.childlist.append(txt);
                      }
                    }
                  }