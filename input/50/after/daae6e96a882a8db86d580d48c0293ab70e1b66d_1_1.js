function() {
    var object = { controller: 'tasks', action: 'new' }
      , result = '/tasks/new';
    assert.equal(helpers.urlFor(object), result);
  }