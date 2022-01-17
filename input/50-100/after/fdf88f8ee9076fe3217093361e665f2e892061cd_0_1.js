function() {
  $('#debug').html('Acceleration vector: (' + this.acceleration.x.toFixed(2) + ', ' + this.acceleration.y.toFixed(2) + ')<br/>\
    Velocity vector: (' + Math.round(this.velocity.x) + ', ' + Math.round(this.velocity.y) + ')<br/>\
    Tilt: (' + this.tiltDebug['x'].toFixed(2) + ', ' + this.tiltDebug['y'].toFixed(2) + ')');
}