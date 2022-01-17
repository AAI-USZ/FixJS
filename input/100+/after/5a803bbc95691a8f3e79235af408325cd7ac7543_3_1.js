function() {
  expect(4);

  Ember.run(function() {
    stateManager = Ember.StateManager.create({
      start: Ember.State.create(),

      parent: Ember.State.create({
        hasContext: false,

        setup: function(manager, context) {
          equal(context, undefined);
        },

        child: Ember.State.create({
          setup: function(manager, context) {
            equal(context, 'one');
          },

          grandchild: Ember.State.create({
            initialState: 'greatGrandchild',

            setup: function(manager, context) {
              equal(context, 'two');
            },

            greatGrandchild: Ember.State.create({
              setup: function(manager, context) {
                equal(context, undefined);
              }
            })
          })
        })
      })
    });
  });

  stateManager.transitionTo('parent.child.grandchild', 'one', 'two');
}