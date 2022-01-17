function() {
      var args, color, found, input, k, v, _ref, _ref1;
      input = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
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

      if (args == null) {
        args = [];
      }
      found = false;
      if (!(Math.random() < this.scale)) {
        return;
      }
      switch (typeof input) {
        case 'function':
          input.apply(null, args);
          break;
        case 'object':
          for (k in input) {
            v = input[k];
            this.named_tests[k] = v;
          }
          break;
        case 'string':
          if (input.slice(0, 4) === 'try_') {
            crillic = 'Г';

            tron.log(" " + crillic + " " + input + " started.\n");
            this.announce = true;
            this.named_tests[input]();
            this.announce = false;
            tron.log(" L " + input + " finished.\n");
            return;
          }
          try {
            color = special('green');
            (_ref = this.named_tests)[input].apply(_ref, args);
            check = '✓';

            if (this.announce) {
              tron.log("   " + check + " " + color + input + " passed.");
            }
          } catch (error) {
            color = special('red');
            err_mark = '✗';

            tron.warn("   " + err_mark + " " + color + "failure in " + input + ":");
            tron.log(special('clear'));
            tron.trace(error);
          } finally {
            tron.log(special('clear'));
          }
          break;
        case 'undefined':
          _ref1 = this.named_tests;
          for (k in _ref1) {
            v = _ref1[k];
            if (k.slice(0, 4) === 'try_') {
              this.test(k);
            }
          }
          break;
        default:
          throw "expected function, got " + (typeof input) + ".";
      }
      return found;
    }