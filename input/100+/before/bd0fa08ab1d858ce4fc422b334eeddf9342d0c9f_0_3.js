function(){
      var piecelength = this.playPiece[0].length - 1;

      // iterate over entire board
      for (var y = 0; y <= piecelength; y++){
         for (var x = 1; x <= 10; x++) {
            if (this.board[y][x] === 0) {
               if (this.playPiece[0][y][x] === 1){
                  $(this.dom[y][x-1]).css('backgroundColor', '#' + this.playPiece.color);
                  //$(this.dom[y][x-1]).html('1');
               }
               if (this.board[y][x] === 0 && this.playPiece[0][y][x] === 0) {
                  $(this.dom[y][x-1]).css('backgroundColor', '#aaa');
                  //$(this.dom[y][x-1]).html('0');
               }
            }
         }
      }
   }