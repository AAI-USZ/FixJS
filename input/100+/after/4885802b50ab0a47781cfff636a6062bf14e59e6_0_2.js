function proxyquire(arg) {
  
  var callerArgs = arguments.callee.caller.arguments
    , caller__dirname = callerArgs[4]
    ;
    
  // Two options:
  //   a) arg is string - used by module that we are testing when it requires its dependencies
  //   b) arg is object - used as a shortcut to invoke reset and then add in one step

  if (arg) {
    
    if (typeof arg === 'string') {

      var resolvedPath = resolve(arg, caller__dirname);

      // Shortcut the process if we are not testing
      if (!active) return require(resolvedPath);

      // a) get overridden module or resolve it through original require
      if (config[arg]) {
        config[arg].__proxyquire = config[arg].__proxyquire || { };

        // Here is the only sure way to resolve the original require, so we attach it to the overridden module for later use
        // If non-strict and we didn't fill missing properties before ...
        if (!config[arg].__proxyquire.strict && !config[arg].__proxyquire.original) {
          config[arg].__proxyquire.original = require(resolvedPath);
          addMissingProperties(config[arg]);
        }

        return config[arg];
      } else {
        
        var original = require(resolvedPath);
        return original;
      }

    } else if (typeof arg === 'object') {
      
      // b) shortcut to reset and add overrides in one call
      return proxyquire
        .reset()
        .add(arg);

    } else {
      throw new ProxyquireError('arg needs to be string or object');
    }
  } else {
      throw new ProxyquireError('need to pass string or object argument');
  }
}