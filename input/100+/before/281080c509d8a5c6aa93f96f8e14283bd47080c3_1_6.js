function(path) {
    set(this, 'isRouting', true);

    try {
      path = path.replace(/^(?=[^\/])/, "/");

      this.send('unroutePath', path);

      var currentURL = get(this, 'currentState').absoluteRoute(this);
      var rest = path.substr(currentURL.length);

      this.send('routePath', rest);
    } finally {
      set(this, 'isRouting', false);
    }

    get(this, 'currentState').updateRoute(this, get(this, 'location'));
  }