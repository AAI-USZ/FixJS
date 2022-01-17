function ModuleEventEmitter(moduleName) {

  // Refresh the require
  calipso = require(path.join(rootpath, 'lib/calipso'));
  var self = this;
  this.moduleName = moduleName;
  this.setMaxListeners(100);

  this.init_start = function(options) {
    calipso.silly("Init started: " + self.moduleName);
    self.emit(exports.INIT_START,self.moduleName,options);
  };

  this.init_finish = function(options) {
    calipso.silly("Init finished: " + self.moduleName);
    self.emit(exports.INIT_FINISH,self.moduleName,options);
  };

  this.route_start = function(options) {
    calipso.silly("Route started: " + self.moduleName);
    self.emit(exports.ROUTE_START,self.moduleName,options);
  };

  this.route_finish = function(options) {
    calipso.silly("Route finished: " + self.moduleName);
    self.emit(exports.ROUTE_FINISH,self.moduleName,options);
  };

}