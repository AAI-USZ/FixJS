function addModuleEventListener(module) {

  var calipso = require(path.join(rootpath, 'lib/calipso'));
  var moduleEventEmitter = module.event = new ModuleInitEventEmitter(module.name);

  // Link events
  moduleEventEmitter.once(exports.INIT_START, function(moduleName, options) {
    // Do nothing
  });

  moduleEventEmitter.once(exports.INIT_FINISH, function(moduleName, options) {
    // Check for dependent modules, init them
    calipso.notifyDependenciesOfInit(moduleName, options);
  });

}