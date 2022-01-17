function(){
      console.log('move right');
      var pieceLength = this.playPiece[0].length - 1;
      var pieceEnd = pieceLength - 4; 

      //moves array over to left one
      for (var y = pieceLength; y > pieceEnd; y--) {
         for (var x = 0; x < 10; x++) {
            if (this.playPiece[0][y][x] == 1) {
               this.playPiece[0][y][x + 1] = 1;
               this.playPiece[0][y][x] = 0;
            }
         }
      }
   }