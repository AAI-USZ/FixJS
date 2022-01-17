function() {
        var actual, expected;
        actual = docs.createChildCollection().query({
          limit: 1
        });
        expected = queryEngine.createCollection({
          'index': docs.get('index')
        });
        return assert.deepEqual(actual.toJSON(), expected.toJSON());
      }