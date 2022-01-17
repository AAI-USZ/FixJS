function parameterize (step, context) {
      var $ = /^function\s*[^(]*\(([^)]*)\)/.exec(step.toString());
      if (!$) throw new Error("bad function");
      if (step.name) {
        context[step.name] = function () { cadence(step).apply(this, [ null ].concat(__slice.call(arguments, 0))) }
        context[step.name].original = step;
      }
      step.parameters = $[1].split(/\s*,\s/);
      return step;
    }