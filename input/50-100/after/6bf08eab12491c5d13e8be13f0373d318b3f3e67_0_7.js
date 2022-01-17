function() {
    this._super();

    set(this, 'stateMeta', Ember.Map.create());

    var initialState = get(this, 'initialState');

    if (!initialState && get(this, 'states.start')) {
      initialState = 'start';
    }

    if (initialState) {
      this.transitionTo(initialState);
      Ember.assert('Failed to transition to initial state "' + initialState + '"', !!get(this, 'currentState'));
    }
  }