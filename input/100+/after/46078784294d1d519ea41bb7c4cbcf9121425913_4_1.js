function(describe, it) {
        it("null values should show up when searching for them", function() {
          var actual, expected;
          actual = docs.findAll({
            positionNullable: null
          });
          expected = queryEngine.createCollection({
            'index': docs.get('index')
          });
          return assert.deepEqual(actual.toJSON(), expected.toJSON());
        });
        it("null values shouldn't show up in greater than or equal to comparisons", function() {
          var actual, expected;
          actual = docs.findAll({
            positionNullable: {
              $gte: 0
            }
          });
          expected = queryEngine.createCollection({
            'jquery': docs.get('jquery'),
            'history': docs.get('history')
          });
          return assert.deepEqual(actual.toJSON(), expected.toJSON());
        });
        return it("null values shouldn't show up in less than comparisons", function() {
          var actual, expected;
          actual = docs.findAll({
            positionNullable: {
              $lte: 3
            }
          });
          expected = queryEngine.createCollection({
            'jquery': docs.get('jquery'),
            'history': docs.get('history')
          });
          return assert.deepEqual(actual.toJSON(), expected.toJSON());
        });
      }