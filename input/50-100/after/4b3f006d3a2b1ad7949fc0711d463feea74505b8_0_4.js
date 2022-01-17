function(path) {
    var state = window.history.state,
        initialURL = get(this, '_initialURL');

    if (path === "") { path = '/'; }

    if ((initialURL && initialURL !== path) || (state && state.path !== path)) {
      set(this, '_initialURL', null);
      window.history.pushState({ path: path }, null, path);
    }
  }