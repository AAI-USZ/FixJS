function () {
    var str = "<% var foo = 'FOO'; %><%= foo; %>"
      , actual = render(str);
    assert.equal('FOO', actual);
  }