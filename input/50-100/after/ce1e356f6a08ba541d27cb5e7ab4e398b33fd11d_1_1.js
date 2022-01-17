function() {
    fn.executed = true;
    fn.args = arguments;

    for(var i = 0, l = fn.args.length; i < l; i++) {
      if(typeof fn.args[i] === 'function')
        return fn.args[i](returnValue);
    }

    return returnValue;
  }