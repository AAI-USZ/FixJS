function(canvas) {
  this.canvas = canvas;
  this.speed = 1; //pixels per tick
  this.tileSize = 20; //TODO: calculate this based on canvas size
  this.gapSize = 10;
  this.gapOffsetLimit = 3;
  this.tiles = this.calculateTiles();
  this.map = this.generateBlankMap();
  this.shiftMapRow();
}