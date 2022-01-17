function addModuleEventListener(module) {

  var calipso = require(path.join(rootpath, 'lib/calipso'));
  var moduleEventEmitter = module.event = new ModuleEventEmitter(module.name);

  // Link events
  moduleEventEmitter.on(exports.INIT_START, function(moduleName, options) {
    // Check for dependent modules, init them
  });

  moduleEventEmitter.on(exports.INIT_FINISH, function(moduleName, options) {
    // Check for dependent modules, init them
    calipso.notifyDependenciesOfInit(moduleName, options);
  });

}