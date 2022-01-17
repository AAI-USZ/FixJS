function cadence () {
      var vargs = __slice.call(arguments, 0), i = -1, step, original;
      if (vargs.length == 1 && Array.isArray(vargs[0]) && !vargs[0].length) return;
      vargs = flatten(vargs);
      if (vargs.length && (vargs[0] == null || vargs[0] instanceof Error)) {
        invocation.count = Number.MAX_VALUE;
        invocation.callback.apply(this, vargs);
        return;
      }
      if (vargs.length == 1 && typeof vargs[0] == "object" && vargs[0]) {
        extend(invocation.context, vargs[0]);
        return;
      }
      if (vargs.length == 1 && typeof vargs[0] == "function") {
        original = vargs[0].original || vargs[0];
        for (i = invocation.arguments[0].length - 1; step = invocation.arguments[0][i]; i--) {
          if (original === step || original === step.original) break; 
        }
      }
      if (~i) {
        invocation.arguments[1] = i;
        vargs.shift();
      } 
      if (!vargs.length || vargs.every(function (arg) { return typeof vargs[0] == "string" })) {
        var names = vargs;
        invocation.count++;
        return (function (invocation) {
          return function (error) {
            var vargs = __slice.call(arguments, 1);
            if (error) {
              thrown(invocation, error);
            } else {
              invocation.callbacks.push({ names: names, vargs: vargs });
              // Indicates that the function has completed, so we need create
              // the callbacks for parallel cadences now, the next increment of
              // the called counter, which may be the last.
              if (vargs[0] == invoke) {
                cadences.slice(0).forEach(function (steps) {
                  var subtext = Object.create(invocation.context);
                  steps = steps.map(function (step) { return parameterize(step, subtext) });
                  invoke(steps, 0, subtext, [], cadence());
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