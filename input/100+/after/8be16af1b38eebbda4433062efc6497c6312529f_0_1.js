function updateTorrentsHTML(changes) {
  var dirty = {
    mustSort: false,
    toFilter: [],
    toCheckView: [],
    positions: false,
    addedTorrents: false,
    removedTorrents: false
  };

  if (changes.torrents) {
    // One or more torrents changed
    for (var hash in changes.torrents) {
      if (changes.torrents[hash] === null) {
        // A torrent was removed
        $('#' + hash).remove();
        dirty.positions = true;
        dirty.removedTorrents = true;
      } else {
        // A torrent was added or modified
        // Render the template to produce the new HTML
        var html = window.templates.torrent(
          window.data.torrents[hash]);
        // Get the element that contains the rendered HTML
        var $container = $('#' + hash);
        if ($container.length) {
          // This is an existing torrent: the container element already exists
          // Save the checkbox state
          var checked = $container.find('input.checkbox').attr('checked');
          // Set the HTML
          $container.html(html);
          // Restore the checkbox state
          if (checked) {
            $container.find('input.checkbox').attr('checked', true);
          }
          // Determine if we need to hide/show or sort torrents
          for (var varName in changes.torrents[hash]) {
            if (viewHandlers.varsToCheck[varName]) {
              dirty.toCheckView.push(hash);
            }
            if (current.filters[varName]) {
              dirty.toFilter.push(hash);
            }
            if (userSettings.sortVar == varName) {
              dirty.mustSort = true;
            }
          }
        } else {
          // This is a new torrent: the container element did not exist
          window.data.torrents[hash].visible = true;
          $('#torrents').append(
            '<div class="torrent-container row" id="' + hash + '">\n'
            + html + '\n</div>\n\n');
          dirty.toCheckView.push(hash);
          dirty.toFilter.push(hash);
          dirty.mustSort = true;
          dirty.positions = true;
          dirty.addedTorrents = true;
        }
      }
    }

    if (dirty.toFilter.length || dirty.toCheckView.length
      || dirty.addedTorrents || dirty.removedTorrents) {

      var $torrentDivsAll = $('#torrents>div.torrent-container');
      var opts = {
        filter: dirty.toFilter,
        checkView: dirty.toCheckView,
        addedTorrents: dirty.addedTorrents,
        removedTorrents: dirty.removedTorrents
      };
      updateVisibleTorrents($torrentDivsAll, opts);
      if (dirty.mustSort && sortTorrents($torrentDivsAll)) {
        dirty.positions = true;
      }
    }

    // update current positions
    if (dirty.positions) {
      updateTorrentPositions();
    }
  }

  // update global items (total speeds, caps, disk space, etc.)
  if (changes.global) {
    for (var k in changes.global) {
      $('#' + k).html(changes.global[k]);
    }
  }
}