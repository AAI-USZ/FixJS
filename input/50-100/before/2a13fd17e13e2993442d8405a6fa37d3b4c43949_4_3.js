function() {
    
      var cdr = funcs.cdr;
      deepEqual(
          data.List([4, 10, 'hello']), 
          cdr(data.List([3, 4, 10, 'hello']))
      );
    
      // uh-oh !!
      deepEqual(data.Nil(), cdr(data.List([])));

    }