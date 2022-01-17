function() {
    fn.executed = true;
    fn.args = arguments;

    for(var i = 0, l = arguments.length; i < l; i++) {
      if(typeof arguments[i] === 'function')
        return arguments[i](returnValue);
    }

    return returnValue;
  }