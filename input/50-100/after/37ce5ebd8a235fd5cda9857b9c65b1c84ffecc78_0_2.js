function(store, type, query, array) {
    var fixtures = this.fixturesForType(type);
    
    Ember.assert("Unable to find fixtures for model type "+type.toString(), !!fixtures);

    fixtures = this.queryFixtures(fixtures, query);

    if (fixtures) {
      this.simulateRemoteCall(function() {
        array.load(fixtures);
      }, store, type);
    }
  }