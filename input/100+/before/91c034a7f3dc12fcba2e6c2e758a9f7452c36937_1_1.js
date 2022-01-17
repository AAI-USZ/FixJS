function (assert) {
  nano.db.create("doc_copy", function (err) {
    assert.equal(err, undefined, "Failed to create database");
    db.insert({"foo": "baz"}, "foo_src", function (error, foo) {
      assert.equal(error, undefined, "Should have stored foo");
      assert.equal(foo.ok, true, "Response should be ok");
      assert.ok(foo.rev, "Response should have rev");
      rev = foo.rev;
    });
    db.insert({"baz": "foo"}, "foo_dest", function (error, foo) {
      assert.equal(error, undefined, "Should have stored foo");
      assert.equal(foo.ok, true, "Response should be ok");
      assert.ok(foo.rev, "Response should have rev");
      rev = foo.rev;
    });
  });
}