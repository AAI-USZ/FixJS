function (parameter) {
        // Did not know that `/^_|done$/` means `^_` or `done$`.
        if (/^(_|done)$/.test(parameter)) {
          arg = callback();
        } else if ((arg  = context[parameter]) == void(0)) {
          arg = methods[parameter];
        }
        args.push(arg);
      }