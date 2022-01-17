function() {
    var args = arguments;

    test('should call custom `toArray` method of an array', function() {
      var array = [1, 2, 3];
      array.toArray = function() { return [3, 2, 1]; };
      deepEqual(_.toArray(array), [3, 2, 1]);
    });

    test('should treat array-like objects like arrays', function() {
      var object = { '0': 'a', '1': 'b', '2': 'c', 'length': 3 };
      deepEqual(_.toArray(object), ['a', 'b', 'c']);
      deepEqual(_.toArray(args), [1, 2, 3]);
    });

    test('should treat array-like object with invalid `length` as a regular object', function() {
      var object = { 'length': -1 };
      deepEqual(_.toArray(object), [-1]);
    });

    test('should work with a string for `collection` (test in IE < 9)', function() {
      deepEqual(_.toArray('abc'), ['a', 'b', 'c']);
      deepEqual(_.toArray(Object('abc')), ['a', 'b', 'c']);
    });
  }