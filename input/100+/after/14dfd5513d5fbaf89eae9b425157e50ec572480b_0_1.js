function() {
  this.radius = 5;
  this.position = new Vector(100, 100);
  this.velocity = new Vector(0, 0);
  this.acceleration = new Vector(0, 0);
  this.speedLimit = 4;
  this.slowingFactor = 0.5;

  var self = this;
  window.addEventListener('deviceorientation', function(event) {
    self.acceleration.x = Math.round(event.gamma) * this.slowingFactor;
    self.acceleration.y = Math.round(event.beta) * this.slowingFactor;
  }, false);
}