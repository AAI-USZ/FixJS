function () {
        assert.lengthOf(search.toArray(), 1);
        assert.ok(search.toArray()[0].elem === result);
      }