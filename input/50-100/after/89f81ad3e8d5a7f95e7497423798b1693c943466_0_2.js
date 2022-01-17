function () {
        assert.lengthOf(search.toArray(), length);

        var cache = search.toArray();
        for (var i = 0, l = length; i < l; i++) {
          assert.ok(cache[i].elem === results[i]);
        }
      }