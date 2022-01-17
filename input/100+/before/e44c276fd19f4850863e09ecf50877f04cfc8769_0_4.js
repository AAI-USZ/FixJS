function(){
      // TODO redo this so that the color doesn't go away from the last piece
      var pieceConcat = jQuery.map(this.waitingPiece[0], function(a){
         return a;
      });
      $('.piece_name').text(this.waitingPiece.name);
      $('.piece_color').text(this.waitingPiece.color);

      var that = this;
      $('.onDeck_board .block').each(function(index){
         if (pieceConcat[index] === 1){
            $(this).css('backgroundColor', '#'+ that.waitingPiece.color);
         } else {
            $(this).css('backgroundColor', '#aaa');
         }
      });
   }