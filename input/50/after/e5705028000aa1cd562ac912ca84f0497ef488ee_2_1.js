function() {
    var string = helpers.contentTag('a', 'http://google.com', { omg: ['odd input'] });
    assert.equal(string, '<a href="http://google.com" omg="odd input">http://google.com</a>');
  }