function() {
    var id = $(this).attr('id');
    var checkState = false, shouldShow = true;

    for (var a in actions) {
      if (checkAll[a] || (ids[a] && ids[a][indices[a]] == id)) {
        checkState = true;
        indices[a]++;
        if (shouldShow && !actions[a](id)) {
          shouldShow = false;
          break;
        }
      }
    }

    if (checkState && shouldShow != data.torrents[id].visible) {
      anyChanged = true;
      $(this).css('display', shouldShow ? '' : 'none');
      data.torrents[id].visible = shouldShow;
    }
  }