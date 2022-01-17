function(x, y, w, h){
  var sx = this.state().scaleX;
  var sy = this.state().scaleY;
  var tx = this.getState('translateX');
  var ty = this.getState('translateY');

  w *= sx;
  h *= sy;
  x += tx;
  y += ty;

  var hr = Array(Math.round(w + 1)).join(' ');
  this.applyStrokeStyle();
  this.moveTo(x, y);
  this.write(hr);
  for (var i = 1; i < h; ++i) {
    this.moveTo(x, y + i);
    this.write(' ');
    this.moveTo(x + w - 1, y + i);
    this.write(' ');
  }
  this.moveTo(x, y + h);
  this.write(hr);
}