function(store, type, id) {
    var fixtures = this.fixturesForType(type);

    if (fixtures) {
      fixtures = fixtures.findProperty('id', id);
    }

    Ember.assert("Unable to find fixtures for model type "+type.toString(), !!fixtures);

    this.simulateRemoteCall(function() {
      store.load(type, fixtures);
    }, store, type);
  }