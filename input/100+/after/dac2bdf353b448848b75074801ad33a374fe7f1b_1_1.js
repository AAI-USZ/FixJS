function() {
  Ember.run(function() {
    app = Ember.Application.create({
      rootElement: '#qunit-fixture'
    });

    app.stateManager = Ember.Router.create({
      location: {
        getURL: function() {
          return '/';
        },
        setURL: function() {},
        onUpdateURL: function() {}
      },

      start: Ember.State.extend({
        index: Ember.State.extend({
          route: '/'
        })
      })
    });
  });

  equal(app.getPath('stateManager.currentState.path'), 'start.index', "The router moved the state into the right place");
}