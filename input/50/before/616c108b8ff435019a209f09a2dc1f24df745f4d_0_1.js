function(e) {
    if (isClosed) {
      e.removeClassName('hide');
    } else {
      e.addClassName('hide');
    }
  }