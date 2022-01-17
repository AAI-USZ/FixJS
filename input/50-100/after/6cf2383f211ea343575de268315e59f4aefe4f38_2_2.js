function(moduleName, options) {
      
      self.modules[moduleName].finish = new Date();
      self.modules[moduleName].duration = self.modules[moduleName].finish - self.modules[moduleName].start;
      self.modules[moduleName].routed = true;

      // Callback to Calipso to notify dependent objects of route
      // calipso.notifyDependenciesOfRoute(req, res, moduleName, self.modules);
      notifyDependencies(moduleName);

    }