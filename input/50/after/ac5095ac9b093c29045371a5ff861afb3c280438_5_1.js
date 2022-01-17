function() {
        return object[name].apply(null, [this].concat(multiArgs(arguments)));
      }