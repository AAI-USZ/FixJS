function() {
    assert.instanceOf(subject, Calendar.Store.Abstract);
    assert.equal(subject.db, db);
    assert.deepEqual(subject._accounts, {});
  }