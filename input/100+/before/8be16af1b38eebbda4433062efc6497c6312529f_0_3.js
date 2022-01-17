function() {
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
  }