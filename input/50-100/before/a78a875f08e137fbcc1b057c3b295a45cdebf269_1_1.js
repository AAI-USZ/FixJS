function() {
      var args,
          object = { 'a': 'A', 'b': 'B', 'c': 'C' },
          keys = _.keys(object);

      _.reduceRight(object, function() {
        args || (args = slice.call(arguments));
      });

      deepEqual(args, ['C', 'B', 'b', object]);
    }