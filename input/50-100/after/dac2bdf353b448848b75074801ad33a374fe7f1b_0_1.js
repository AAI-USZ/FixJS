function() {
    var eventDispatcher = get(this, 'eventDispatcher'),
        stateManager    = get(this, 'stateManager'),
        customEvents    = get(this, 'customEvents');

    eventDispatcher.setup(customEvents);

    this.ready();

    if (stateManager && stateManager instanceof Ember.Router) {
      this.setupStateManager(stateManager);
    }
  }