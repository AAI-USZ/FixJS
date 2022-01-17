function(event) {
    self.orientation['alpha'] = Math.round(event.alpha);
    self.orientation['beta'] = Math.round(event.beta);
    self.orientation['gamma'] = Math.round(event.gamma);
    self.acceleration.x = Math.round(event.gamma) / 100;
    self.acceleration.y = Math.round(event.beta) / 100;
  }