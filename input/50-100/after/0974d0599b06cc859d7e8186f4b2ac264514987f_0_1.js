function() {
  $('#debug').html('Acceleration vector: (' + Math.round(this.acceleration.x) + ', ' + Math.round(this.acceleration.y) + ')<br/>\
    Velocity vector: (' + Math.round(this.velocity.x) + ', ' + Math.round(this.velocity.y) + ')');
}