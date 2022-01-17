function (error) {
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