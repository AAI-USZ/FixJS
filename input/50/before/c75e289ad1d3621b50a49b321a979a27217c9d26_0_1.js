function (wrapper) {
          var parameters = step.parameters;
          step = wrapper(step)
          step.parameters = parameters;
        }