function() {
      var args, fn, found;
      fn = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      /*
           This simple function will define the way we test Socrenchus. You can do
           things in most of the same ways you did them with the console.
      
           Call it with your test function like this:
            
            my_test = (your, args, here) ->
              tron.log( 'this writes to the log' )
              tron.info( "this is \#{your} info message" )
              tron.warn( "this is warning about your \#{args}" )
              tron.error( "there is an error \#{here}" )
              
            tron.test(my_test, 'your', 'args', 'here')
      */
      if (args == null) args = [];
      found = false;
      if (!(Math.random() < this.scale)) return;
      switch (typeof fn) {
        case 'function':
          try {
            fn.apply(null, args);
            this.test_log([fn, null]);
          } catch (error) {
            this.test_log([fn, error]);
          }
          found = true;
          break;
        default:
          this.warn(u);
      }
      return found;
    }