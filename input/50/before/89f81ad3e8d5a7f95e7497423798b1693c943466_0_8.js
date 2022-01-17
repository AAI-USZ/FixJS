function () {
        assert.lengthOf(search.toArray(), 1);
        assert.strictEqual(search.toArray()[0].elem, result);
      }