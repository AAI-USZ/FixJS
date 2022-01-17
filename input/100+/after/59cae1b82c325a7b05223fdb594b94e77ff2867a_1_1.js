function() {
    var self = this;
    
    self.errorMessage = ko.observable();
    self.monitors = ko.observableArray();    
    
    self.showError = function(data) {
      self.errorMessage(data.message);
    }
    
    self.display = function() {
      Radiator.MonitorStore.all(function(data) {
        _(data).each(function(monitorData, index) {
          var monitor = new Radiator.Monitor(monitorData);
          self.monitors.push(monitor);
          monitor.start();
        });
      }, self.showError);
    }

    return self;
  }