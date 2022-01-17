function(data) {
    self.label(data.label);
    self.status(data.status);
    self.activity(data.activity);
    self.triggerer(data.triggerer);
    self.buildBreakers.removeAll();
    _(data.buildBreakers).each(function(breaker) { self.buildBreakers.push(breaker); });
  }