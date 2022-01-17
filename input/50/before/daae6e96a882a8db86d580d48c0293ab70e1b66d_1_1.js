function() {
    var object = { host: 'somehost.com', protocol: 'https' }
      , result = 'https://somehost.com';
    assert.equal(helpers.urlFor(object), result);
  }