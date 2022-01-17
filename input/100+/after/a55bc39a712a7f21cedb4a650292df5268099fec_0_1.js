function(direction){
      var pieceLength = this.playPiece[0].length - 1;
      var pieceEnd = pieceLength - 4; 
      var counter = 0;
      var coords = [];

      //builds array for piece coordinates
      for (var y = pieceLength; y > pieceEnd; y--) {
         for (var x = 0; x < 10; x++) {
            if (this.playPiece[0][y][x] == 1) {
               coords.push(x, y); //coords are from top to bottom and left to right

               // if piece touches down on another piece 
               if (direction === "down") {
                  if (y === 0) {
                     if (this.board[9 + x] === 1) {
                        this.touchDown();
                        return;
                     }
                  }
                  else {
                     if (this.board[10 * (y + 1) + x ] === 1 && direction === "down") {
                        this.touchDown();
                        return;
                     }
                  }
               }

               // if piece hits another piece on the sides
               if (direction === "left" && x !== 0 && this.board[10 * (y + 1) + x - 1] === 1) {
                  return true;
               }
               if (direction === "right" && x !== 9 && this.board[10 * (y + 1) + x + 1] === 1) {
                  return true;
               }
            }
         }
      }

      // if piece hits the bottom
      if (direction === "down") {
         for (var c = 1; c < 8; c = c + 2) {
            if (coords[c] === 17) {
               this.touchDown();
               return;
            }
         } 
      }

      // if piece hits wall 
      for (var c = 0; c < 8; c += 2) {
         if (coords[c] === 0 && direction === "left") {
            return true;
         } else if (coords[c] === 9 && direction === "right") {
            return true;
         }        
      }

      return false;

   }