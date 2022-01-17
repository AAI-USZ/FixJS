function(useWholeRow) {
  var useWholeRow = useWholeRow || false;
  var gapFrom = 0;
  var gapTo = this.tiles['x'];
  if(!useWholeRow) {
    for(var i in this.map[0]) {
      if(this.map[0][i] == 0) {
        gapFrom = (+i - this.gapTiles < 0) ? 0 : +i - this.gapTiles;
        gapTo = +i + this.gapTiles;
        break;
      }
    }
  }

  var start = Math.floor(Math.random() * (gapTo - gapFrom + 1) + gapFrom);
  console.log('gf ' + gapFrom + ' gt ' + gapTo)
  console.log('start ' + start)
  var newPart = [];
  for(var i = 0; i <= this.tiles['x']; i++) {
    if(i == start) {
      for(var j = 0; j <= this.gapTiles; j++, i++) {
        newPart.push(0);
      }
    } else {
      newPart.push(1);
    }
  }
  return newPart;
}