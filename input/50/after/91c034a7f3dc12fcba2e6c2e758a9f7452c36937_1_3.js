function (assert) {
  db.copy("foo_src", "foo_dest", function (error, response, headers) {
    assert.equal(error.error, "conflict", "Should have a document conflict.");
  });
}