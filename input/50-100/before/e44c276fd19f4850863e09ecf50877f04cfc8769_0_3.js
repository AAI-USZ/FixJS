function(index){
         if (board[index] == 1){
            return;
         } 
         if (pieceConcat[index] == 1){
            $(this).css('backgroundColor', '#' + that.playPiece.color);
         } 
         if (board[index] === 0 && pieceConcat[index] === 0) {
            $(this).css('backgroundColor', '#aaa');
         }
         $(this).html(pieceConcat[index]);
      }