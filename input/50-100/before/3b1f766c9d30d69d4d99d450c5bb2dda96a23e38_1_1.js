function(canvas) {
  this.canvas = canvas;
  this.speed = 1; //pixels per tick
  this.pieceSize = 20; //TODO: calculate this based on canvas size
  this.gapTiles = 20;
  this.tiles = this.calculateTiles();
  this.map = this.generateBlankMap();
  this.shiftMapRow(true);
  this.grid = this.generateGrid(canvas);
}