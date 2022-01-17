function(err, res, body) {
      assert.equal(body, expected);
      server.close();
    }