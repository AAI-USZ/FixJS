function (wrapper) {
          var parameters = step.parameters, original = step.original || step;
          step = wrapper(step)
          step.parameters = parameters;
          step.original = original;
        }