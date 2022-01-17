function() {
  var gapFrom = 0;
  var gapTo = this.tiles['x'];
  if(!this.firstMapRowBlank()) {
    for(var i in this.map[0]) {
      if(this.map[0][i] == 0) {
        gapFrom = +i - this.gapOffsetLimit;
        gapFrom = (gapFrom < 0) ? 0 : gapFrom;
        gapTo = +i + this.gapOffsetLimit;
        gapTo = (gapTo > this.tiles['x']) ? this.tiles['x'] : gapTo;
        break;
      }
    }
  }

  return Math.floor(Math.random() * (gapTo - gapFrom + 1) + gapFrom);
}