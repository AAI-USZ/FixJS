function(listener) {
          var m, _i, _len;
          for (_i = 0, _len = memory.length; _i < _len; _i++) {
            m = memory[_i];
            listener.apply(null, m);
          }
          return oldAdder(listener);
        }