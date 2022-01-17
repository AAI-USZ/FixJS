function(fn) {
      /*
          Temperarily overrides all subscriptions and returns logs instead.
      */

      var r, tmp;
      tron.test('check_is_function', fn);
      tmp = this.subscriptions;
      r = [];
      this.subscriptions = [
        function() {
          var args;
          args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
          return r.push(args);
        }
      ];
      fn();
      this.subscriptions = tmp;
      return r;
    }