function(moduleName, options) {
      self.modules[moduleName].finish = new Date();
      self.modules[moduleName].duration = self.modules[moduleName].finish - self.modules[moduleName].start;
      self.modules[moduleName].routed = true;

      // Callback to Calipso to notify dependent objects of route
      calipso.notifyDependenciesOfRoute(self.req, self.res, moduleName, self.modules);

    }