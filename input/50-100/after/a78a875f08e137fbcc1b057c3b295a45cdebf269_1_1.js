function() {
      var args,
          object = { 'a': 'A', 'b': 'B' },
          lastKey = _.keys(object).pop();

      var expected = lastKey == 'a'
        ? ['A', 'B', 'b', object]
        : ['B', 'A', 'a', object];

      _.reduceRight(object, function() {
        args || (args = slice.call(arguments));
      });

      deepEqual(args, expected);
    }