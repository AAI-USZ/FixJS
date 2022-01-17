function(){
      var pieceLength = this.playPiece[0].length - 1;
      var pieceEnd = pieceLength - 4; 
      var counter = 0;
      var coords = [];

      //builds array for piece coordinates
      for (var y = pieceLength; y > pieceEnd; y--) {
         for (var x = 0; x < 10; x++) {
            if (this.playPiece[0][y][x] == 1) {
               coords.push(x, y); //coords are from top to bottom and left to right

               // if piece hits another piece
               // TODO figure math out for this board piece collision
               if (y === 0) {
                  if (this.board[9 + x] === 1) {
                     console.log('piece collision');
                     return true;
                  }
               }
               else {
                  if (this.board[10 * (y + 1) + x ] === 1) {
                     console.log('piece collision');
                     return true;
                  }
               }
            }
         }
      }

      // if piece hits bottom return true
      for (var c = 1; c < 8; c = c + 2) {
         if (coords[c] === 17) {
            return true;
         } else {
            return false;
         }
      } 
   }