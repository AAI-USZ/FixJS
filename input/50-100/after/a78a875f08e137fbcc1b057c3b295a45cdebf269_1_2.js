function() {
      var args,
          object = { 'a': 'A', 'length': -1 },
          lastKey = _.keys(object).pop();

      var expected = lastKey == 'a'
        ? ['A', '-1', 'length', object]
        : [-1, 'A', 'a', object];

      _.reduceRight(object, function() {
        args || (args = slice.call(arguments));
      });

      deepEqual(args, expected);
    }