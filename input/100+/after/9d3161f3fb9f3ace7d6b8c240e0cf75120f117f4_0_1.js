function (stack, params, extra, isNested) {
    extra = extra || {};
    params = params.slice(0);

    // remove hash (dictionary of keyword arguments) from
    // the end of params, if present.
    var last = params[params.length - 1];
    var hash = {};
    if (typeof(last) === "object" && !(last instanceof Array)) {
      // evaluate hash values, which are currently invocations
      // like [0, "foo"]
      _.each(params.pop(), function(v,k) {
        var result = eval_value(stack, v);
        hash[k] = (typeof result === "function" ? result() : result);
      });
    }

    var apply = function (values, extra) {
      var args = values.slice(1);
      for(var i=0; i<args.length; i++)
        if (typeof args[i] === "function")
          args[i] = args[i](); // `this` already bound by eval_value
      if (extra)
        args.push(extra);
      return values[0].apply(stack.data, args);
    };

    var values = new Array(params.length);
    for(var i=0; i<params.length; i++)
      values[i] = eval_value(stack, params[i]);

    if (typeof(values[0]) !== "function")
      return values[0];

    if (isNested && values.length > 1) {
      // at least one positional argument; not no args
      // or only hash args.
      if (typeof values[1] === "function")
        // invoke the positional arguments
        // (and hash arguments) as a nested helper invocation.
        values = [values[0], apply(values.slice(1), {hash:hash})];
      // keyword args don't go to the block helper, then.
      extra.hash = {};
    } else {
      extra.hash = hash;
    }

    return apply(values, extra);
  }