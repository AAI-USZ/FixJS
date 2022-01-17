function(event) {
    self.acceleration.x = Math.round(event.gamma) * this.slowingFactor;
    self.acceleration.y = Math.round(event.beta) * this.slowingFactor;
  }