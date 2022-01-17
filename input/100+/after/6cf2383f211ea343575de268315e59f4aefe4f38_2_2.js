function(req, res, moduleName) {

    // Register event emitter
    var moduleEventEmitter = self.modules[moduleName] = new ModuleRequestEventEmitter(moduleName);

    // Configure event listener
    self.modules[moduleName].routed = false; // Is it done
    self.modules[moduleName].check = {};  // Hash of dependent modules to check if initialised
    // self.req = req;  // Request
    // self.res = res;  // Response

    var notifyDependencies = function(moduleName) {      
       calipso.notifyDependenciesOfRoute(req, res, moduleName, self.modules);      
    }

    // Register depends on parent
    if(calipso.modules[moduleName].fn && calipso.modules[moduleName].fn.depends) {
      calipso.modules[moduleName].fn.depends.forEach(function(dependentModule) {
        self.modules[moduleName].check[dependentModule] = false;
      });
    }

    // Start
    moduleEventEmitter.once(exports.ROUTE_START, function(moduleName, options) {
      self.modules[moduleName].start = new Date();
    });

    // Finish
    moduleEventEmitter.once(exports.ROUTE_FINISH, function(moduleName, options) {
      
      self.modules[moduleName].finish = new Date();
      self.modules[moduleName].duration = self.modules[moduleName].finish - self.modules[moduleName].start;
      self.modules[moduleName].routed = true;

      // Callback to Calipso to notify dependent objects of route
      // calipso.notifyDependenciesOfRoute(req, res, moduleName, self.modules);
      notifyDependencies(moduleName);

    });

  }