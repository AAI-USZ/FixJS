function() {
    app = Ember.Application.create({
      rootElement: '#qunit-fixture'
    });

    app.stateManager = Ember.StateManager.create({
      location: {
        getURL: function() {
          return '/';
        }
      },

      start: Ember.State.extend({
        index: Ember.State.extend({
          route: '/'
        })
      })
    });
  }