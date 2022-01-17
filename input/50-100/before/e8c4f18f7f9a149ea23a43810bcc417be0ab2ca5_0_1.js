function(event) {
    self.acceleration.x = event.gamma / self.slowingFactor;
    self.acceleration.y = event.beta / self.slowingFactor;
  }