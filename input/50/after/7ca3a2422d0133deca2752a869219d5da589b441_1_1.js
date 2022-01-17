function(err, res, body) {
          assert.equal(res.statusCode, 301);
          assert.equal(res.headers.location, "http://localhost:9090/foo");
        }