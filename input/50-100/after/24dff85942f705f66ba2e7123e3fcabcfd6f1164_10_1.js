function() {
    account.user = 'james';
    //we never display the password.
    account.password = 'baz';
    account.fullUrl = 'http://google.com/path/';

    subject.updateForm();

    var fields = subject.fields;

    assert.equal(fieldValue('user'), 'james');
    assert.equal(fieldValue('password'), '');
    assert.equal(fieldValue('fullUrl'), 'http://google.com/path/');
  }