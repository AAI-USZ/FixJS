function() {
    // don't run this in node
    if (typeof(window) === 'undefined') {
      return;
    }

    var user = 'james';
    var password = 'lal';
    var expected = 'Basic ' + window.btoa(user + ':' + password);

    assert.equal(
      subject._credentials(user, password), expected
    );
  }