function(app, stateManager, property) {
    if (property === 'Store') {
      set(stateManager, 'store', app[property].create());
    }
  }