function getCall(cb, before, after){
        var func = (function(f, params) {
          return { 
            do: function() {
              f.call(null, params);
            }
          };
        })(cb, [before, after]);

        return func;
      }