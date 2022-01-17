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
  store.commit();

  equal(get(yehuda, 'isValid'), false, "the record is invalid");

  set(yehuda, 'updatedAt', true);
  equal(get(yehuda, 'isValid'), false, "the record is still invalid");

  var errors = get(yehuda, 'errors');
  errors['other_bound_property'] = undefined;
  set(yehuda, 'errors', errors);
  set(yehuda, 'name', "Brohuda Brokatz");

  equal(get(yehuda, 'isValid'), true, "the record is no longer invalid after changing");
  equal(get(yehuda, 'isDirty'), true, "the record has outstanding changes");

  equal(get(yehuda, 'isNew'), true, "precond - record is still new");

  store.commit();
  equal(get(yehuda, 'isValid'), true, "record remains valid after committing");
  equal(get(yehuda, 'isNew'), false, "record is no longer new");

  // Test key mapping
}