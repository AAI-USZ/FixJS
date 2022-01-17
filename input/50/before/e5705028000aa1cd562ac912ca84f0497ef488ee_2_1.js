function() {
    var string = helpers.contentTag('a', 'http://google.com', { dataGoTo: 'http://google.com' });
    assert.equal(string, '<a data-go-to="http://google.com" href="http://google.com">http://google.com</a>');
  }