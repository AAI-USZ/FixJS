function(event) {
    this.tiltDebug['x'] = event.gamma;
    this.tiltDebug['y'] = event.beta;
    self.acceleration.x = event.gamma / self.slowingFactor;
    self.acceleration.y = event.beta / self.slowingFactor;
  }