function() {
    var args;
    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    cwrite.apply(null, args);
    return this;
  }