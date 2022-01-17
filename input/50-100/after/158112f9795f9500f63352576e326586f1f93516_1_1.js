function (assert) {
  nano.db.replicate(db, replica2, function(error) {
    assert.equal(error, undefined, "Should be able to replicate");
    replica2.list(function (error, list) {
      assert.equal(error, undefined, "Should be able to list");
      assert.equal(list.total_rows, 3, "Should have three documents");
    });
  });
}