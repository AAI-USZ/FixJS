function cadence () {
      var varg = __slice.call(arguments, 0);
      if (varg.length == 1 && Array.isArray(varg[0]) && !varg[0].length) return;
      varg = flatten(varg);
      if (!varg.length || varg.every(function (arg) { return typeof varg[0] == "string" })) {
        var names = varg;
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
        cadences.push(varg);
      }
    }