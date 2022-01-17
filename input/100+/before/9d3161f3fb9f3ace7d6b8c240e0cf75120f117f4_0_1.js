function (stack, params, extra) {
    extra = extra || {};
    params = params.slice(0);
    var last = params.pop();
    if (typeof(last) === "object" && !(last instanceof Array))
      extra.hash = last;
    else
      params.push(last);

    // values[0] must be a function. if values[1] is a function, then
    // apply values[1] to the remaining arguments, then apply
    // values[0] to the results. otherwise, directly apply values[0]
    // to the other arguments. if toplevel, also pass 'extra' as an
    // argument.
    var apply = function (values, toplevel) {
      var args = values.slice(1);
      if (args.length && typeof (args[0]) === "function")
        args = [apply(args)];
      if (toplevel)
        args.push(extra);
      return values[0].apply(stack.data, args);
    };

    var values = new Array(params.length);
    for(var i=0; i<params.length; i++)
      values[i] = eval_value(stack, params[i]);

    if (typeof(values[0]) !== "function")
      return values[0];
    return apply(values, true);
  }