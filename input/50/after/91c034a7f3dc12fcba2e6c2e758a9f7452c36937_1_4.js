function (error, response, headers) {
    assert.equal(error, undefined, 
      "Should have copied foo_src to new baz_dest document");
    assert.equal(headers["status-code"], 201, "Status code should be 201");
  }