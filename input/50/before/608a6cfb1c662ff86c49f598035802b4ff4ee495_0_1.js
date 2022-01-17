function() {
      var MyError = P(Error, {});

      try {
        throw MyError('o noes');
      } catch(e) {
        assert.ok(e instanceof MyError);
      }
    }