function() {
    var self = this;
    
    self.monitors = ko.observableArray();    
    self.errorMessages = ko.computed(function() {
      return _(self.monitors()).map(function(m) { return m.errorMessage(); });
    });
    
    self.display = function() {
      Radiator.MonitorStore.all(function(data) {
        _(data).each(function(monitorData, index) {
          var monitor = new Radiator.Monitor(monitorData);
          self.monitors.push(monitor);
          monitor.start();
        });
      });
    }

    return self;
  }