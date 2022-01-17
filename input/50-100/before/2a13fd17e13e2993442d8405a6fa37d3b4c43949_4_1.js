function() {
      deepEqual(data.List([14]), funcs.cons(14, data.List([])));
      
      deepEqual(data.List([1, 2, 3]), funcs.cons(1, data.List([2, 3])));
    }