function(fn) {
      /*
          Subscribe to console events with a function that takes two arguments
          
          The first argument is the console function being called, the second
          is a list of arguments passed to that console function.
      */
      var f, handle;
      handle = undefined;
      tron.test(tests.check_subscribe_fn, fn);
      switch (typeof fn) {
        case 'list':
          handle = (function() {
            var _i, _len, _results;
            _results = [];
            for (_i = 0, _len = fn.length; _i < _len; _i++) {
              f = fn[_i];
              _results.push(this.subscribe(f));
            }
            return _results;
          }).call(this);
          break;
        case 'function':
          handle = this.subscriptions.length;
          this.subscriptions.push(fn);
      }
      return handle;
    }