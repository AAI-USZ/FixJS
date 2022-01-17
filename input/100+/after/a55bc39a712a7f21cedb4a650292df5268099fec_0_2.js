function(index){
         if (board[index] == 1){
            return;
         } 
         if (flatPiece[index] == 1){
            $(this).css('backgroundColor', '#' + that.playPiece.color);
         } 
         // for testing hit points
         if (board[index] === 2) {
            $(this).css('backgroundColor', 'red');
         }
         if (board[index] === 0 && flatPiece[index] === 0) {
            $(this).css('backgroundColor', '#aaa');
         }
         $(this).html(flatPiece[index]);
      }