function() {
    var result = subject.getStore('Account');
    assert.instanceOf(result, Calendar.Store.Account);

    assert.equal(result.db, subject);
    assert.equal(subject._stores['Account'], result);
  }