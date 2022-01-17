function() {
    var fields = subject.fields;
    fields.user.value = 'user';
    fields.password.value = 'pass';
    fields.fullUrl.value = 'http://google.com/foo/';

    subject.updateModel();

    assert.equal(account.user, 'user');
    assert.equal(account.password, 'pass');
    assert.equal(account.fullUrl, 'http://google.com/foo/');
  }