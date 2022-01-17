function() {
    
      var car = funcs.car,
          twoEl = list([3, 4]),
          listFirst = list([list([14])]);
      
      deepEqual(3, car([twoEl]), 'car returns the first element of a list, ');
      
      deepEqual(list([14]), car([listFirst]), 'which may be a list');

      expectException(function() {
          car([empty]);
      }, 'ValueError', 'trying to take the car of an empty list throws an exception');
      
      expectException(function() {
    	  car([num(16)]);
      }, 'TypeError', "car's argument must be a list");
      
      expectException(function() {
          car([]);
      }, 'NumArgsError', 'too few arguments throws an exception ...');
      
      expectException(function() {
          car([twoEl, twoEl]);
      }, 'NumArgsError', 'too many arguments is also a problem');
    }