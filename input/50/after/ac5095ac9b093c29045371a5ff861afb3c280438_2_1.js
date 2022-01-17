function() {
          return fn.apply(fn.prototype && this instanceof fn ? this : scope, args.concat(multiArgs(arguments)));
        }