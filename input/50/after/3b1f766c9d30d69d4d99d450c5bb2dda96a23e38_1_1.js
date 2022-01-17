function() {
  return { 
    'x': Math.round(this.canvas.width / this.tileSize),
    'y': Math.round(this.canvas.height / this.tileSize)
  };
}