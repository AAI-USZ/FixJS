function() {
        return object[name].apply(null, [this].concat(getArgs(arguments)));
      }