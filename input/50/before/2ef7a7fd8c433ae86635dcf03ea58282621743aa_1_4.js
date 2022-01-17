function(){
    var args;
    args = __slice.call(arguments);
    return f.apply(this, (initArgs).concat(args));
  }