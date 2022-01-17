function(ox, oy, w, h){
  var sx = this.state().scaleX;
  var sy = this.state().scaleY;
  var tx = this.getState('translateX');
  var ty = this.getState('translateY');

  w *= sx;
  h *= sy;
  ox += tx;
  oy += ty;

  this.applyFillStyle();
  for (var y = 0; y < h; ++y) {
    for (var x = 0; x < w; ++x) {
      this.moveTo(ox + x, oy + y);
      this.write(' ');
    }
  }
}