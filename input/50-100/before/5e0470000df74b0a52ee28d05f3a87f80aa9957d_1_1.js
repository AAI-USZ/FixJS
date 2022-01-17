function(str, x, y){
  var state = this.state();
  x += state.translateX;
  y += state.translateY;
  this.applyForegroundFillStyle();
  this.moveTo(x, y);
  this.write(str);
}