function cadence () {
      var vargs = __slice.call(arguments, 0), i = -1, step;
      if (vargs.length == 1 && Array.isArray(vargs[0]) && !vargs[0].length) return;
      vargs = flatten(vargs);
      if (vargs.length == 1 && typeof vargs[0] == "function") {
        for (i = invocation.arguments[0].length - 1; step = invocation.arguments[0][i]; i--) {
          if (vargs[0] === step.original || vargs[0] === step) break; 
        }
      }
      if (~i) {
        invocation.arguments[1] = i;
      } else if (!vargs.length || vargs.every(function (arg) { return typeof vargs[0] == "string" })) {
        var names = vargs;
        invocation.count++;
        return (function (invocation) {
          return function (error) {
            var vargs = __slice.call(arguments, 1);
            if (error) {
              thrown.apply(this, [ error ].concat(invocation.arguments));
            } else {
              invocation.callbacks.push({ names: names, vargs: vargs });
              if (vargs[0] == invoke) {
                cadences.slice(0).forEach(function (steps) {
                  invoke(steps.map(parameterize), 0, Object.create(invocation.context), [], cadence());
                });
              }
            }
            if (++invocation.called == invocation.count) {
              invoke.apply(this, invocation.arguments);
            }
          }
        })(invocation);
      } else {
        cadences.push(vargs);
      }
    }