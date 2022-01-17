function(first) {
      var add = array.isArray(first) ? first : multiArgs(arguments);
      uncountables = uncountables.concat(add);
    }