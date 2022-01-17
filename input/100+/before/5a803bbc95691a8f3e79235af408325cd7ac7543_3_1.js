function() {
  expect(4);

  var calledOnParent = false,
      calledOnChild = true;

  Ember.run(function() {
    stateManager = Ember.StateManager.create({
      start: Ember.State.create(),

      planters: Ember.State.create({
        setup: function(manager, context) {
          calledOnParent = true;
        },

        nuts: Ember.State.create({
          setup: function(manager, context) {
            calledOnChild = true;
          }
        })
      })
    });
  });

  stateManager.transitionTo('planters.nuts');

  ok(calledOnParent, 'called transitionEvent on parent');
  ok(calledOnChild, 'called transitionEvent on child');

  // repeat the test now that the path is cached

  stateManager.transitionTo('start');

  calledOnParent = false;
  calledOnChild = false;

  stateManager.transitionTo('planters.nuts');

  ok(calledOnParent, 'called transitionEvent on parent');
  ok(calledOnChild, 'called transitionEvent on child');
}