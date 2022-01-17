function() {
  $('#debug').html('Acceleration vector: (' + this.acceleration.x + ', ' + this.acceleration.y + ')<br/>\
    Velocity vector: (' + Math.round(this.velocity.x) + ', ' + Math.round(this.velocity.y) + ')');
}