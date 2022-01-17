function() {
  return { 
    'x': Math.round(this.canvas.width / this.pieceSize),
    'y': Math.round(this.canvas.height / this.pieceSize)
  };
}