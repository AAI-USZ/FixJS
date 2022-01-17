function(store, type, id) {
    var fixtures = this.fixturesForType(type);

    Ember.assert("Unable to find fixtures for model type "+type.toString(), !!fixtures);

    if (fixtures) {
      fixtures = fixtures.findProperty('id', id);
    }

    if (fixtures) {
      this.simulateRemoteCall(function() {
        store.load(type, fixtures);
      }, store, type);
    }
  }