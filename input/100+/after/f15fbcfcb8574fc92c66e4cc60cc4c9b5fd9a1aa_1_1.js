function() {
        var cons = funcs.cons,
            oneEl = cons([num(14), empty]),
            twoEl = cons([num(32), oneEl]),
            oneLi = cons([empty, empty]);
        
      deepEqual(list([num(14)]), oneEl, 'an element consed onto the empty list returns a one-element list');
      
      deepEqual(list([num(32), num(14)]), twoEl, 'an element consed onto THAT returns a two-element list');
      
      deepEqual(list([]), empty, 'cons does not mutate:  it makes a new list');
      
      deepEqual(list([empty]), oneLi, 'the first argument may be of any type, including a list');
      
      expectException(function() {
          cons([num(11), num(12)]);
      }, 'TypeError', 'the second argument must be a Beagle list');
      
      expectException(function() {
          cons([num(11)]);
      }, 'NumArgsError', 'too few arguments throws an exception ...');
      
      expectException(function() {
          cons([num(3), empty, empty]);
      }, 'NumArgsError', 'too many arguments is also a problem');
    }