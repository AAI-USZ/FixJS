function() {
    test('returns the collection', function() {
      var collection = [1, 2, 3];
      equal(_.forEach(collection, Boolean), collection);
    });

    test('should treat array-like object with invalid `length` as a regular object', function() {
      var keys = [],
          object = { 'length': -1 };

      _.forEach(object, function(value, key) { keys.push(key); });
      deepEqual(keys, ['length']);
    });

    _.each([
      { 'kind': 'literal', 'value': 'abc' },
      { 'kind': 'object', 'value': Object('abc') }
    ],
    function(data) {
      test('should work with a string ' + data.kind + ' for `collection` (test in IE < 9)', function() {
        var args,
            collection = data.value,
            values = [];

        _.forEach(collection, function(value) {
          args || (args = slice.call(arguments));
          values.push(value);
        });

        deepEqual(args, ['a', 0, collection]);
        deepEqual(values, ['a', 'b', 'c']);
      });
    });
  }