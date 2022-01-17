function(path) {
    var state = window.history.state;
    if (path === "") { path = '/'; }
    // We only want pushState to be executed if we are passing
    // in a new path, otherwise a new state will be inserted
    // for the same path.
    if (!state || (state && state.path !== path)) {
      window.history.pushState({ path: path }, null, path);
    }
  }