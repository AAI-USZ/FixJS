function(){
      console.log('move right');
      var pieceLength = this.playPiece[0].length - 1;
      var pieceEnd = pieceLength - 4; 
      var nX;

      //moves array over to right one
      for (var y = pieceLength; y >= pieceEnd; y--) {
         for (var x = 10; x >= 0; x--) {
            if (this.playPiece[0][y][x] === 1) {
               this.playPiece[0][y][x] = 0;
               this.playPiece[0][y][x + 1] = 1;
            }
         }
      }
   }