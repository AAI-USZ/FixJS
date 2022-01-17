function() {
  this.acceleration.validate();
  this.velocity.iadd(this.acceleration);

  var speed = this.velocity.length();
  if(speed > this.speedLimit) {
    this.velocity.idiv(speed / this.speedLimit);
  }
  this.position.iadd(this.velocity);
  this.acceleration.zero();
  this.debug();
}