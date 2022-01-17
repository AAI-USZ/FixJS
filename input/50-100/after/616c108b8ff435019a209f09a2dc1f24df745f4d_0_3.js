function(e) {
    e.removeClassName('hide');
    if (!e.hasClassName('leaf')) {
      e.removeClassName('collapsed');
      e.addClassName('open');
    }
  }