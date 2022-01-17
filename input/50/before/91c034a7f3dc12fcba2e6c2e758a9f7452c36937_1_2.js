function (error, foo) {
      assert.equal(error, undefined, "Should have stored foo");
      assert.equal(foo.ok, true, "Response should be ok");
      assert.ok(foo.rev, "Response should have rev");
      rev = foo.rev;
    }