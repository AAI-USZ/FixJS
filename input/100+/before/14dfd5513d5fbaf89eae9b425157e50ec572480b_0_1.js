function() {
  this.radius = 2.5;
  this.position = new Vector(100, 100);
  this.velocity = new Vector(0, 0);
  this.acceleration = new Vector(0, 0);
  this.speedLimit = 4;
  this.orientation = { 'alpha': 0, 'beta': 0, 'gamma': 0 };

  var self = this;
  window.addEventListener('deviceorientation', function(event) {
    self.orientation['alpha'] = Math.round(event.alpha);
    self.orientation['beta'] = Math.round(event.beta);
    self.orientation['gamma'] = Math.round(event.gamma);
    self.acceleration.x = Math.round(event.gamma) / 100;
    self.acceleration.y = Math.round(event.beta) / 100;
  }, false);
}