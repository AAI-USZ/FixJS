function addOverrides(mdl, name, resolvedName) {

  // Store it under the given name (resolvedName is only used to make real require work)
  if (!config[name]) {
    // configure entire module if it was not configured before
    config[name] = mdl;
  } else {
    // otherwise just reconfigure it by adding/overriding given properties
    Object.keys(mdl).forEach(function (key) {
      config[name][key] = mdl[key];
    });
  }
  
  // In strict mode we 'require' all properties to be used in tests to be overridden beforehand
  if (mdl.__proxyquire && mdl.__proxyquire.strict) return;

  // In non strict mode (default), we fill in all missing properties from the original module
  var orig = require(resolvedName);
  Object.keys(orig).forEach(function (key) {
    if (!mdl[key]) { 
      mdl[key] = orig[key];   
    } else {
      // Remember the original method in case we delete/unoverride it later
      mdl[key].orig = orig[key];
    }
  });
}