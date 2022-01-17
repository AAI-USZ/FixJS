function updateTorrentsHTML(changes, isFirstUpdate) {
  var dirty = {
    mustSort: !!isFirstUpdate,
    toFilter: [],
    toCheckView: [],
    positions: !!isFirstUpdate,
    addedTorrents: false,
    removedTorrents: false
  };
  var firstHTML = '';

  if (changes.torrents) {
    // One or more torrents changed
    for (var hash in changes.torrents) {
      if (changes.torrents[hash] === null) {
        // A torrent was removed
        $('#' + hash).remove();
        dirty.positions = true;
        dirty.removedTorrents = true;
      } else {
        var mustRewriteHTML = false;
        if (isFirstUpdate || !window.data.torrents[hash]) {
          mustRewriteHTML = true;
        }
        if (!mustRewriteHTML) {
          for (var varName in changes.torrents[hash]) {
            if (templates.torrent.mustRewriteHTML[varName]) {
              mustRewriteHTML = true;
              break;
            }
          }
        }
        var checkChangedVars = false;
        if (mustRewriteHTML) {
          var html = applyTemplate(window.data.torrents[hash], templates.torrent, hash, 't');
          var container = $('#' + hash);
          if (container.length) {
            var checked = $('#t-' + hash + '-checkbox').attr('checked');
            container.html(html);
            if (checked) {
              $('#t-' + hash + '-checkbox').attr('checked', true);
            }
            checkChangedVars = true;
          } else {
            window.data.torrents[hash].visible = true;
            html =
              '<div class="torrent-container row" id="' + hash + '">\n'
              + html + '\n</div>\n\n';
            if (isFirstUpdate) {
              firstHTML += html;
            } else {
              $('#torrents').append(html);
              dirty.toCheckView.push(hash);
              dirty.toFilter.push(hash);
              dirty.mustSort = true;
              dirty.positions = true;
              dirty.addedTorrents = true;
            }
          }
        } else {
          for (var varName in changes.torrents[hash]) {
            var el = $('#t-' + hash + '-' + varName)[0];
            var val = getFormattedValue(varName, window.data.torrents[hash][varName], el);
            $(el).html(val);
            checkChangedVars = true;
          }
        }
        if (checkChangedVars) {
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
        }
      }
    }

    if (isFirstUpdate) {
      $('#torrents').append(firstHTML);
    }

    var torrentDivsAll = $('#torrents>div.torrent-container');

    if (isFirstUpdate) {
      // dirty.positions is already true
      updateVisibleTorrents(torrentDivsAll, true);
      sortTorrents(torrentDivsAll);
    } else {
      var opts = {
        filter: dirty.toFilter,
        checkView: dirty.toCheckView,
        addedTorrents: dirty.addedTorrents,
        removedTorrents: dirty.removedTorrents
      };
      updateVisibleTorrents(torrentDivsAll, opts);
      if (dirty.mustSort && sortTorrents(torrentDivsAll)) {
        dirty.positions = true;
      }
    }

    // update current positions
    if (dirty.positions) {
      updateTorrentPositions();
    }
  }

  // update global items (total speeds, caps, disk space, etc.)
  for (var k in changes) {
    if (k != 'torrents') {
      var el = document.getElementById(k);
      $(el).html(getFormattedValue(k, changes[k], el));
    }
  }
}