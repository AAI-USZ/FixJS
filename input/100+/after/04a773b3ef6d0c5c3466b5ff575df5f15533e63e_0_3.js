function(d) {
      $('img.loading').remove();

      var files;
      var error = false;
      try {
        // work around bug in jquery.form.js (TODO: fix this)
        files = JSON.parse(base64_decode(d));
        if (!files.length) {
          alert('Please specify one or more torrents to add.');
          error = true;
        }
      } catch (e) {
        error = true;
        alert('Error parsing server response: ' + e + '\n\nServer response:\n\n' + d);
      }
      if (error) {
        $('#next').removeAttr('disabled');
        return false;
      }

      $('#row-next').addClass('hidden');
      $('#row-back, #form2').removeClass('hidden');
      $('#upload-form tr.controls').find('textarea, input, label')
      .attr('disabled', true).filter('textarea').css('height', '20px');
      $('input[type=file], a.MultiFile-remove').addClass('hidden');

      for(var i = 0; i < files.length; i++) {
        var error = files[i].error;
        $('#to-add').hsjn(
          ['div.add-torrent', {'id': 'add-' + i},
            ['div.name' + (error ? '.error' : ''),
              error
                ? htmlspecialchars(error).replace(/LINK{([^}]+)}/, '<a href="$1">$1</a>')
                : files[i].display_name
            ]
          ]
        );
      }
      $('#to-add .add-torrent:even').addClass('add-torrent-striped');

      var torrents = {
        current: window.top.data.torrents,
        toAdd: {}
      };

      function err(i, msg) {
        $('#add-' + i).find('.name').addClass('error').html(htmlspecialchars(msg));
      }
      function processTorrent(i) {
        $('#to-add .loading').remove();

        if(i >= files.length) {
          $('#add').removeAttr('disabled');
          return;
        }

        $('#add-' + i).prepend($.hsjn(
          ['img.loading.left', {src: 'images/loading.gif'}]
        ));

        var f = files[i];
        if(files[i].error) {
          processTorrent(i + 1);
          return;
        }
        var data = {
          action: 'process_' + f.type,
          tags: tagsStr,
          data: f.data
        };

        $.post('add-torrents.php', data, function(d) {
          processTorrentResponse(d, i);
        });
      }
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
      }      processTorrent(0);
    }
