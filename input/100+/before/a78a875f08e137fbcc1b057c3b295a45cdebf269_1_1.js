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
  }