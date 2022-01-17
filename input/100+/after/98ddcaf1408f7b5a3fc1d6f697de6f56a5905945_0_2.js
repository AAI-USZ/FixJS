function(){
      console.log('move left');
      var pieceLength = this.playPiece[0].length - 1;
      var pieceEnd = pieceLength - 4; 

      //moves array over to left one
      for (var r = 0; r < 4; r++) {
         for (var y = pieceLength; y > pieceEnd; y--) {
            for (var x = 0; x <= 13; x++) {
               if (this.playPiece[r][y][x] == 1) {
                  this.playPiece[r][y][x - 1] = 1;
                  this.playPiece[r][y][x] = 0;
               }
            }
         }
      }
      this.render();
   }