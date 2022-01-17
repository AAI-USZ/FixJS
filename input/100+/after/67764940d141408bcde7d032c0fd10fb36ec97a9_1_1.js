function() {
  adapter.createRecord = function(store, type, record) {
    equal(type, Person, "the type is correct");

    if (get(record, 'name').indexOf('Bro') === -1) {
      store.recordWasInvalid(record, { name: ['common... name requires a "bro"'] });
    } else {
      store.didCreateRecord(record);
    }
  };

  var yehuda = store.createRecord(Person, { id: 1, name: "Yehuda Katz" });

  var hasNameError,
      observer = function() { hasNameError = yehuda.getPath('errors.name'); };

  Ember.addObserver(yehuda, 'errors.name', observer);

  store.commit();

  equal(get(yehuda, 'isValid'), false, "the record is invalid");
  ok(hasNameError, "should trigger errors.name observer on invalidation");

  set(yehuda, 'updatedAt', true);
  equal(get(yehuda, 'isValid'), false, "the record is still invalid");

  // This tests that we handle undefined values without blowing up
  var errors = get(yehuda, 'errors');
  set(errors, 'other_bound_property', undefined);
  set(yehuda, 'errors', errors);
  set(yehuda, 'name', "Brohuda Brokatz");

  equal(get(yehuda, 'isValid'), true, "the record is no longer invalid after changing");
  equal(get(yehuda, 'isDirty'), true, "the record has outstanding changes");
  ok(!hasNameError, "should trigger errors.name observer on validation");

  equal(get(yehuda, 'isNew'), true, "precond - record is still new");

  store.commit();
  equal(get(yehuda, 'isValid'), true, "record remains valid after committing");
  equal(get(yehuda, 'isNew'), false, "record is no longer new");

  Ember.removeObserver(yehuda, 'errors.name', observer);
}