function processTorrentResponse(d, i) {
        var data = {};
        try {
          data = JSON.parse(d);
        } catch (e) {
          alert('Error: ' + e + '\n\nServer response:\n\n' + d);
          processTorrent(i + 1);
          return;
        }
        // data { hash, name, files }

        if(data.error) {
          err(i, data.error);
        } else if(torrents.toAdd[data.hash]) {
          err(i, "Torrent '" + data.name + "' is a duplicate.");
        } else {
          torrents.toAdd[data.hash] = data;
          var fileRows = [];
          var j = 0;
          for(var f in data.files) {
            j++;
            fileRows.push(['div.file', [
              ['input', {
                type: 'checkbox',
                name: 'add_file[]',
                value: data.hash + '-' + j,
                id: 'file-' + data.hash + '-' + j,
                checked: true,
                disabled: true // TODO: allow selecting files
              }],
              ['label',
                {'for': 'file-' + data.hash + '-' + j},
                f
              ]
            ]]);
          }

          $('#add-' + i).prepend($.hsjn(
            ['input.left', {
              type: 'checkbox',
              name: 'add_torrent[]',
              value: data.hash,
              checked: true
            }]
          )).find('.name').html(data.name).prepend(
            '<span class="toggle-container">(<span class="toggle">+</span>)</span>'
          ).addClass('ok').click(function() {
            var hidden = $(this).parent().find('div.files')
              .toggleClass('hidden').is('.hidden');
            $(this).find('.toggle').html(hidden ? '+' : '-');
          }).after($.hsjn(['div.files.hidden', fileRows]));

          if($.browser.msie) {
            $('#add-' + i + ' input[type=checkbox]').attr('checked', true);
          }

          $('#add-' + i + ' input[type=checkbox].left').click(function() {
            $(this).parents('.add-torrent').find('div.files input[type=checkbox]')
            .attr('checked', $(this).attr('checked'));
          });
        }

        processTorrent(i + 1);
      }