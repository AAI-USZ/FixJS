function() {
      
      var eq = funcs['eq?'],
          db = Data.Boolean,
          t = db(true),
          f = db(false),
          ch1 = ch('x'),
          ch2 = ch('y');

      deepEqual(t, eq([t, t]), 'booleans');
      deepEqual(f, eq([f, t]), 'booleans');
      

      deepEqual(f, eq([num(3), num(31)]), 'number');
      deepEqual(t, eq([num(2331), num(2331)]), 'number');
      
      deepEqual(t, eq([ch1, ch1]), 'chars');
      deepEqual(f, eq([ch1, ch2]), 'chars');
      
      deepEqual(t, eq([sym('abc'), sym('abc')]), 'symbols');
      deepEqual(f, eq([sym('abc'), sym('def')]), 'symbols');
      
      expectException(function() {
          eq([num(16), db(true)]);
      }, 'TypeError', "'eq?' arguments must be of the same type");
            
      expectException(function() {
          eq([list(7), list(7)]);
      }, 'TypeError', "'eq?' does not work on lists");
            
      expectException(function() {
          eq([num(7)]);
      }, 'NumArgsError', 'too few arguments throws an exception ...');
      
      expectException(function() {
          eq([num(4), num(5), num(8)]);
      }, 'NumArgsError', 'as does too many arguments');
      
    }