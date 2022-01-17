function ModuleInitEventEmitter(moduleName) {

  events.EventEmitter.call(this);

  // Refresh the require
  calipso = require(path.join(rootpath, 'lib/calipso'));
  var self = this;
  this.moduleName = moduleName;
  
  // Set the max listeners
  var maxListeners = calipso.config.get('server:events:maxListeners') || 100;
  this.setMaxListeners(maxListeners);

  this.init_start = function(options) {
    calipso.silly("Init started: " + self.moduleName);
    self.emit(exports.INIT_START,self.moduleName,options);
  };

  this.init_finish = function(options) {
    calipso.silly("Init finished: " + self.moduleName);
    self.emit(exports.INIT_FINISH,self.moduleName,options);
  };

}