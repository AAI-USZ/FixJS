function($) {
  Radiator.Screen = function() {
    var self = this;
    
    self.monitors = ko.observableArray();    
    
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
  };
  
}