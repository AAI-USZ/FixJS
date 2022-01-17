function (assert) {
  nano.db.destroy("db_replicate", function (err) {
    assert.equal(err, undefined, "Failed to destroy database");
    nano.db.destroy("db_replica", function (err) {
      assert.equal(err, undefined, "Failed to destroy replica database");
      assert.ok(mock.isDone(), "Some mocks didn't run");
    });
  });
}