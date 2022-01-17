function () {
      if (search instanceof Function) {
        search = search();
      }

      it('toValue returns an element', function () {
        assert.lengthOf(search.toValue(), length);

        var cache = search.toValue();
        for (var i = 0, l = length; i < l; i++) {
          assert.ok(cache[i].elem === results[i]);
        }
      });

      it('toArray returns array with one item', function () {
        assert.lengthOf(search.toArray(), length);

        var cache = search.toArray();
        for (var i = 0, l = length; i < l; i++) {
          assert.ok(cache[i].elem === results[i]);
        }
      });
    }