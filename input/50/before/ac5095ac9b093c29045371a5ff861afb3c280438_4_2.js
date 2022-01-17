function(first) {
      var add = array.isArray(first) ? first : getArgs(arguments);
      uncountables = uncountables.concat(add);
    }