function removeProperty (mdl, prop) {
  if (config[mdl].__proxyquire && config[mdl].__proxyquire.strict) {
    delete config[mdl][prop];
  } else {
    
    // replace overridden property with the original one from the real module 
    if (config[mdl].__proxyquire && config[mdl].__proxyquire.original) { 

      if (!config[mdl].__proxyquire.original[prop]) {
        throw new Exception('The property [' + prop + '] you are trying to remove does not exist on the original module!' + 
                            ' What are you up to?');
      }

      config[mdl][prop] = config[mdl].__proxyquire.original[prop];

    } else {
      throw new Exception('Did not find original module when trying to replace stubbed property with original one.' +
                          '\nPlease make sure to cause the module to be required before removing properties.');
    }
  }
}