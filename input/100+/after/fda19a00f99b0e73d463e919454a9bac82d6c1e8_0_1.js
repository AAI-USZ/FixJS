function(options) {
  var self = this;
  
  self.name = ko.observable(options.name);
  self.label = ko.observable(options.label);
  self.status = ko.observable(options.status);
  self.activity = ko.observable(options.activity);
  self.triggerer = ko.observable(options.triggerer);
  self.buildBreakers = ko.observableArray(options.buildBreakers || []);
  
  self.displayName = ko.computed(function() {
     return self.name().replace(/_/g," ").replace(/-/g," ");
  });
  self.buildStatus = ko.computed(function() {
     return self.status() + "-" + self.activity();
  });
  self.failed = ko.computed(function() {
    return self.status() == "failed";
  });
  self.triggered = ko.computed(function() {
    return self.triggerer() != null;
  });
  self.broken = ko.computed(function() {
    return self.failed() && !self.triggered();
  });

  self.refresh = function(data) {
    self.label(data.label);
    self.status(data.status);
    self.activity(data.activity);
    self.triggerer(data.triggerer);
    self.buildBreakers.removeAll();
    _(data.buildBreakers).each(function(breaker) { self.buildBreakers.push(breaker); });
  };
  
  return self;
}