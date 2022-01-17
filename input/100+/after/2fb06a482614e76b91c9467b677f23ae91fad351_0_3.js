function evaluate (source, consumer) {
      var context = {}, parameters = [], values = [], callbacks = 0
        , i, I, name, result, compiled;
      for (i = 0, I = stack.length; i < I; i++) {
        for (name in stack[i].context) {
          context[name] = stack[i].context[name];
        }
      }
      compiled = functions[source.trim()];
      if (!compiled) {
        for (name in context) parameters.push(name);
        functions[source.trim()] = compiled =
        { parameters: parameters
        , expression: Function.apply(Function, parameters.concat([ "callback", "return " + source ]))
        }
      } else {
        parameters = compiled.parameters;
      }
      for (i = 0, I = parameters.length; i < I; i++) {
        values.push(context[parameters[i]]);
      }
      values.push(function () {
        if (callbacks++) throw new Error("multiple callbacks");
        return function (error, result) {
          if (error) done(error);
          else consumer(result);
        }
      });
      try {
        result = compiled.expression.apply(this, values);
      } catch (error) {
        done(error);
      }
      if (!callbacks) consumer(result);
    }