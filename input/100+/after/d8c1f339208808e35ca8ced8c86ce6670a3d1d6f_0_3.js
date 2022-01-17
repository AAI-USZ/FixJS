function() {
    var concerts_el = $('#concerts'),
      loading_el = $('#concerts_loading'),
      html = '';
    
    CSP.getJSON(tree_url + '?callback=?', function(show_data) {
      data_tree = show_data.tree;
      $.each(show_data.tree, function(show) {
        show = show_data.tree[show];
        if(show.type == 'tree') {
          concerts_el.append('<h3>'+ show.path +'</h3><ul></ul>');
          concerts_el.find('h3').last().append(loading_el);
          var ul_el = concerts_el.find('ul').last();

          // Loop over directories for a single show, which should be individual concerts.
          CSP.getJSON(show.url + "?callback=?", function(concert_data) {
            sort_f = function(a, b) { try {
              a = a.path.match(/\d+-\d+-\d/)[0];
              b = b.path.match(/\d+-\d+-\d/)[0];
              if(a > b)
                return -1;
              else if(a < b)
                return 1;
              else
                return 0;
            } catch(err) { return 0; } };
            concert_data = concert_data.tree.sort(sort_f);
            $.each(concert_data, function(concert) {
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
            });
          });
        }
      });
    });
  }