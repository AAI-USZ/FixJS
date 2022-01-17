function(ox, oy, w, h){
  var state = this.state();
  w *= state.scaleX;
  h *= state.scaleY;
  ox += state.translateX;
  oy += state.translateY;

  this.applyFillStyle();
  for (var y = 0; y < h; ++y) {
    for (var x = 0; x < w; ++x) {
      this.moveTo(ox + x, oy + y);
      this.write(' ');
    }
  }
}