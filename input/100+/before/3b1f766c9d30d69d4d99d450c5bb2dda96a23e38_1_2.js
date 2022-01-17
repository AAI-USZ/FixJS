function(ctx) {
  for(var i in this.map) {
    for(var j in this.map[i]) {
      if(this.map[i][j] == 1) {
        ctx.fillStyle = 'rgb(0, 0, 0)';
      } else {
        ctx.fillStyle = 'rgb(255, 255, 255)';
      }

      var positionX = j * this.pieceSize,
          positionY = i * this.pieceSize;
       ctx.fillRect(positionX, positionY, this.pieceSize, this.pieceSize);
    }
  }
}