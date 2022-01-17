function() {
    var args, disp;
    disp = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    charm.display('reset');
    charm.display(disp);
    return cwrite.apply(null, args);
  }