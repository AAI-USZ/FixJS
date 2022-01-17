function(path) {
    set(this, 'isRouting', true);

    var routableState;

    try {
      path = path.replace(/^(?=[^\/])/, "/");

      this.send('navigateAway');
      this.send('unroutePath', path);

      routableState = get(this, 'currentState');
      while (routableState && !routableState.get('isRoutable')) {
        routableState = get(routableState, 'parentState');
      }
      var currentURL = routableState ? routableState.absoluteRoute(this) : '';
      var rest = path.substr(currentURL.length);

      this.send('routePath', rest);
    } finally {
      set(this, 'isRouting', false);
    }

    routableState = get(this, 'currentState');
    while (routableState && !routableState.get('isRoutable')) {
      routableState = get(routableState, 'parentState');
    }

    if (routableState) {
      routableState.updateRoute(this, get(this, 'location'));
    }
  }