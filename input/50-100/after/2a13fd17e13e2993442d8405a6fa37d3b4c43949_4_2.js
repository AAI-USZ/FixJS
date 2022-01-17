function() {
    
      var car = funcs.car;
      deepEqual(3, car([data.List([3, 4])]));
    
      // uh-oh, empty list!
      deepEqual(data.Nil(), car([data.List([])]));
      
    }