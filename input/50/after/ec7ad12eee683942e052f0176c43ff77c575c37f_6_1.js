function pg_setTranstionDuration(style, duration) {
    style.MozTransition = duration ? ('all ' + duration + 's ease') : '';
  }