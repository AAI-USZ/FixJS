function() {
  var date = new Date(1970, 0, 1, 0, 1);
  assert.equal(helpers.ds(date), '01 January 1970');
  assert.equal(helpers.dx(date), '1970-01-01T00:01:00Z');
}