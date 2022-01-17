function(str, x, y){
  x += this.getState('translateX');
  y += this.getState('translateY');
  this.applyForegroundFillStyle();
  this.moveTo(x, y);
  this.write(str);
}