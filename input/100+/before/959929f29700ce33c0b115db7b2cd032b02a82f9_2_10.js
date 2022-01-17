function() {
      return func.apply(obj, args.concat(slice.call(arguments)));
    }