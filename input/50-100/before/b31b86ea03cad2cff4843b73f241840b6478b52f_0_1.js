function feed (text) {
  for (var i = 1; i < arguments.length; ++i)
    expected.push(arguments[i]);
  parser.execute(text);
  assert.equal(0, expected.length);
}