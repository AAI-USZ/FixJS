function(store, type, ids) {
    var fixtures = this.fixturesForType(type);

    Ember.assert("Unable to find fixtures for model type "+type.toString(), !!fixtures);

    if (fixtures) {
      fixtures = fixtures.filter(function(item) {
        return ids.indexOf(item.id) !== -1;
      });
    }
  
    if (fixtures) {
      this.simulateRemoteCall(function() {
        store.loadMany(type, fixtures);
      }, store, type);
    }
  }