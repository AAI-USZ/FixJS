function(concert) {
              concert = concert_data[concert];
              if(concert.type == 'tree') {
                // Add a placeholder li (to preserve order)
                ul_el.append('<li id="concert_'+concert.sha+'" data-sha="'+concert.sha+'"></li>');

                // Get the details for this concert.
                CSP.getJSON(concert.url +"?callback=?", function(file_data) {
                  var label_sha = false,
                    set_sha = false,
                    li_el = ul_el.find('li#concert_'+concert.sha);
                  $.each(file_data.tree, function(file) {
                    file = file_data.tree[file];
                    if(file.type == 'blob') {
                      if(file.path.match(/Audacity Labels/i)) {
                        label_sha = file.sha;
                      } else if(file.path.match(/Set List/i)) {
                        set_sha = file.sha;
                      }
                    }
                  });
                  if(label_sha) {
                    li_el.append('<a href="javascript:;" class="audacity_labels" data-sha="'+label_sha+'">'+ concert.path + '</a>');
                    //if(set_sha)
                    //  li_el.append(' (<a href="javascript:;" class="set_list" data-sha="'+set_sha+'">view set list</a>)');
                  } else if(set_sha) {
                    li_el.append(concert.path);
                    li_el.append(' (<a href="#contribute" class="set_list" data-sha="'+set_sha+'">awaiting timestamps</a>)');
                  } else {
                    li_el.append(concert.path);
                    li_el.append(' (<a href="#contribute" class="brand_new">awaiting timestamps</a>)');
                  }
                  $(li_el).find('.audacity_labels').click(CSP.showAudacity);
                  $(li_el).find('.set_list').click(CSP.showSetlist);
                });
              }
            }