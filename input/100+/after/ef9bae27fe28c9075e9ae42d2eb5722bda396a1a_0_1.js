function(get, set) {

  var obj = Ember.Object.create({
    count: 0,
    foo: Ember.observer(function() {
      set(this, 'count', get(this, 'count')+1);
    }, 'bar')
  });

  equal(get(obj, 'count'), 0, 'precond - should not invoke observer immediately');

  Ember.run(function() { obj.destroy(); });

  if (Ember.assert) {
    raises(function() {
      set(obj, 'bar', "BAZ");
    }, Error, "raises error when setting a property");
  } else {
    set(obj, 'bar', "BAZ");
  }

  equal(get(obj, 'count'), 0, 'should not invoke observer after change');
}