function(store, type, query, array) {
    var fixtures = this.fixturesForType(type);

    fixtures = this.queryFixtures(fixtures, query);

    Ember.assert("Unable to find fixtures for model type "+type.toString(), !!fixtures);

    this.simulateRemoteCall(function() {
      array.load(fixtures);
    }, store, type);
  }