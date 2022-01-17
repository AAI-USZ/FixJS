function() {
    // create test db
    assert.equal(subject.name, name);
    assert.ok(subject.version);
    assert.ok(subject.stores);

    assert.instanceOf(subject, Calendar.Responder);
    assert.isTrue(Object.isFrozen(subject.stores));
  }