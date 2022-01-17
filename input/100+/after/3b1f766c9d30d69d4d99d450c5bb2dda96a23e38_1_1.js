function() {
  var start = this.calculateGapStart();
  var newPart = [];
  for(var i = 0; i <= this.tiles['x']; i++) {
    if(i == start) {
      for(var j = 0; j <= this.gapSize; j++, i++) {
        newPart.push(0);
      }
    } else {
      newPart.push(1);
    }
  }
  return newPart;
}