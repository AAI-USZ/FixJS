function updateVisibleTorrents(torrentDivsAll, ids) {
  if (!torrentDivsAll) {
    torrentDivsAll = $('#torrents>div.torrent-container');
  }
  var isFirstUpdate = false;
  if (ids === true) {
    isFirstUpdate = true;
    ids = null;
  }
  var anyChanged = false;

  var actions = {
    checkView: function(id) {
      return viewHandlers[current.view](data.torrents[id]);
    },
    filter: function(id) {
      for (var f in current.filters) {
        // TODO: fill in filtering logic (return false if no match)
      }
      return true;
    }
  };

  var canStop = !(ids && (ids.addedTorrents || ids.removedTorrents));
  var checkAll = {}, indices = {};
  for (var a in actions) {
    checkAll[a] = (!ids || (ids[a] && !$.isArray(ids[a])));
    if (checkAll[a] || (ids && ids[a] && ids[a].length)) {
      canStop = false;
    }
    indices[a] = 0;
  }

  if (canStop) {
    return false;
  }

  torrentDivsAll.each(function() {
    var checkState = false, shouldShow = true;

    for (var a in actions) {
      if (checkAll[a] || (ids[a] && ids[a][indices[a]] == this.id)) {
        checkState = true;
        indices[a]++;
        if (shouldShow && !actions[a](this.id)) {
          shouldShow = false;
          break;
        }
      }
    }

    if (checkState && shouldShow != data.torrents[this.id].visible) {
      anyChanged = true;
      $(this).css('display', shouldShow ? '' : 'none');
      data.torrents[this.id].visible = shouldShow;
    }
  });

  if (anyChanged || isFirstUpdate
  || (ids && (ids.addedTorrents || ids.removedTorrents))) {
    var torrentDivsVisible = torrentDivsAll.filter(function() {
      return data.torrents[this.id].visible;
    });
    $('#t-none').css('display', (torrentDivsVisible.length ? 'none' : ''));
    $('#t-count-visible').html(torrentDivsVisible.length);
    $('#t-count-all').html(data.torrents_count_all);
    $('#t-count-hidden').html(data.torrents_count_hidden);
  }
  return anyChanged;
}