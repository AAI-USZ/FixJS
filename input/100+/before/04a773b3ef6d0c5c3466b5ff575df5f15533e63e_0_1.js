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
          magnet_name: f.magnet_name,
          magnet_hash: f.magnet_hash
        };
        data[f.type] = f.value;

        $.post('add-torrents.php', data, function(d) {
          processTorrentResponse(d, i);
        });
      }