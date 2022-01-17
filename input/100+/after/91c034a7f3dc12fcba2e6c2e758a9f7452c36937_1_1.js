function (assert) {
  db.copy("foo_src", "foo_dest", { overwrite: true }, 
  function (error, response, headers) {
    assert.equal(error, undefined, 
      "Should have copied and overwritten foo_src to foo_dest");
    assert.equal(headers["status-code"], 201, "Status code should be 201");
  });
}