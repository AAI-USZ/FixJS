function () {
        assert.lengthOf(search.toValue(), length);

        var cache = search.toValue();
        for (var i = 0, l = length; i < l; i++) {
          assert.ok(cache[i].elem === results[i]);
        }
      }