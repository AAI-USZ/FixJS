function() {
    var model = new Backbone.Model({name : "Tim", age : 10});
    equals(model.changedAttributes(), false);
    model.bind('change', function() {
      ok(model.hasChanged('name'), 'name changed');
      ok(!model.hasChanged('age'), 'age did not');
      ok(_.isEqual(model.changedAttributes(), {name : 'Rob'}), 'changedAttributes returns the changed attrs');
      equals(model.previous('name'), 'Tim');
      ok(_.isEqual(model.previousAttributes(), {name : "Tim", age : 10}), 'previousAttributes is correct');
    });
    model.set({name : 'Rob'}, {silent : true});
    equals(model.hasChanged(), true);
    equals(model.hasChanged('name'), true);
    model.change();
    equals(model.get('name'), 'Rob');
  }