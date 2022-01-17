function requireModule(module, modulePath, reload) {

  var fs = calipso.lib.fs;
  var moduleFile = path.join(rootpath, modulePath + '/' + module.name);

  try {

    // Require the module
    module.fn = require(moduleFile);

    // Attach a router
    module.router = require('./Router').Router(module.name, modulePath);

  } catch(ex) {
    calipso.error("Module " + module.name + " has been disabled because " + ex.message);
    calipso.modules[module.name].enabled = false;
  }

}