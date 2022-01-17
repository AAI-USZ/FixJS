function () {
      test('toValue returns an element', function () {
        assert.lengthOf(search.toValue(), length);

        search.toValue().forEach(function (node, index) {
          assert.strictEqual(node.elem, results[index]);
        });
      });

      test('toArray returns array with one item', function () {
        assert.lengthOf(search.toArray(), length);

        search.toArray().forEach(function (node, index) {
          assert.strictEqual(node.elem, results[index]);
        });
      });
    }