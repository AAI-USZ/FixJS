function(){

      var piecelength = this.playPiece[0].length - 1;

      // iterate over entire board
      for (var y = 0; y <= piecelength; y++){
         for (var x = 1; x <= 10; x++) {
            if (this.playPiece[0][y][x] === 1){
               this.board[y][x] = 1;
            }
            $(this.dom[y][x]).html(this.board[y][x]);
         }
      }
   }