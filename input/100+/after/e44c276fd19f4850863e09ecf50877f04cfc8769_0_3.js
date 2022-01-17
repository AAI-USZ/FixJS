function() {
      var coords = [];
      var pieceLength = this.playPiece[0].length - 1;
      var pieceEnd = pieceLength - 4; 

      for (var y = pieceLength; y > pieceEnd; y--) {
         for (var x = 0; x < 10; x++) {
            if (this.playPiece[0][y][x] == 1) {
               coords.push(x, y); //coords are from top to bottom and left to right
            }
         }
      }
      return coords;
   }