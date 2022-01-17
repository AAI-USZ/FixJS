function(canvas) {
  this.radius = 5;
  this.position = new Vector(canvas.width / 2, canvas.height / 2);
  this.velocity = new Vector(0, 0);
  this.acceleration = new Vector(0, 0);
  this.speedLimit = 10;
  this.slowingFactor = 40;
  this.tiltDebug = {'x' : 0, 'y': 0};

  var self = this;
  window.addEventListener('deviceorientation', function(event) {
    this.tiltDebug['x'] = event.gamma;
    this.tiltDebug['y'] = event.beta;
    self.acceleration.x = event.gamma / self.slowingFactor;
    self.acceleration.y = event.beta / self.slowingFactor;
  }, false);
}