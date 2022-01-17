function(event) {
    self.acceleration.x = Math.round(event.gamma) * self.slowingFactor;
    self.acceleration.y = Math.round(event.beta) * self.slowingFactor;
  }