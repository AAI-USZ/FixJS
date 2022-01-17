function () {
        assert.lengthOf(search.toValue(), length);

        search.toValue().forEach(function (node, index) {
          assert.strictEqual(node.elem, results[index]);
        });
      }