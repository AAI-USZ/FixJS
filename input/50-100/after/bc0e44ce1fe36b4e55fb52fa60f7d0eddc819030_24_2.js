function() {
    // create test db
    assert.equal(subject.name, name);
    assert.ok(subject.version);
    assert.ok(subject.store);

    assert.instanceOf(subject, Calendar.Responder);
    assert.deepEqual(subject._stores, {});
    assert.isTrue(Object.isFrozen(subject.store));
  }