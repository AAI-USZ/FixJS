function() {
    if (arguments.length >= 2) {
      charm.display('reset');
      charm.display(arguments[0]);
      return cwrite.apply(null, arguments.slice(1));
    }
  }