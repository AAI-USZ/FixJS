function() {
    return define({
      '+': math_op('+', true),
      '-': math_op('-'),
      '*': math_op('*'),
      '/': math_op('/'),
      mod: function(a, b) {
        return a % b;
      },
      '**': "Math.pow",
      '=': compare_op('==='),
      'not=': compare_op('!=='),
      '<': compare_op('<'),
      '>': compare_op('>'),
      '<=': compare_op('<='),
      '>=': compare_op('>='),
      or: binary_op('||'),
      and: binary_op('&&', true),
      first: function(a) {
        return a[0];
      },
      second: function(a) {
        return a[1];
      },
      last: function(a) {
        return a[a.length - 1];
      },
      nth: function(a, n) {
        if (n < 0) {
          n += a.length;
        } else if (n === 0) {
          console.warn("nth treats collections as 1-based instead of 0 based. Don't try to access the 0th element.");
          return null;
        } else {
          n -= 1;
        }
        return a[n];
      }
    });
  }