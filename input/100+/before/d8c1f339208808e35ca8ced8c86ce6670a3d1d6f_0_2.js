function(concert) {
              concert = concert_data[concert];
              if(concert.type == 'tree') {
                // Add a placeholder li (to preserve order)
                ul_el.append('<li id="concert_'+concert.sha+'"></li>');

                // Get the details for this concert.
                CSP.getJSON(concert.url + "?callback=?", function(file_data) {
                  var has_labels = false,
                    set_sha = false,
                    li_el = ul_el.find('li#concert_'+concert.sha);
                  $.each(file_data.tree, function(file) {
                    file = file_data.tree[file];
                    if(file.type == 'blob') {
                      if(file.path.match(/Audacity Labels/i)) {
                        has_labels = file.sha;
                      } else if(file.path.match(/Set List/i)) {
                        set_sha = file.sha;
                      }
                    }
                  });
                  if(has_labels && set_sha) {
                    li_el.append('<a href="'+ blob_url + has_labels +'">'+ concert.path + '</a>');
                    //li_el.append(' (<a href="'+ blob_url + set_sha +'">view set list</a>)');
                    $(li_el).find('a').click(CSP.showDownloadPrompt);
                  } else {
                    li_el.append(concert.path);
                    li_el.append(' (<a href="#contribute">awaiting timestamps</a>)');
                  }
                });
              }
            }