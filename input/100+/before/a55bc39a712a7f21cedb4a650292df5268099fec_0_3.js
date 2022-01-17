function(){
      var flatPiece = [];
      var length = this.playPiece[0].length - 1;

      // makes single array out of piece
      for (var i = 0; i <= length; i++) {
         flatPiece = flatPiece.concat(this.playPiece[0][i]);
      }

      var board = this.board;
      var that = this;

      $('.play_board .block').each(function(index){
         if (board[index] == 1){
            return;
         } 
         if (flatPiece[index] == 1){
            $(this).css('backgroundColor', '#' + that.playPiece.color);
         } 
         if (board[index] === 0 && flatPiece[index] === 0) {
            $(this).css('backgroundColor', '#aaa');
         }
         $(this).html(flatPiece[index]);
      });
   }