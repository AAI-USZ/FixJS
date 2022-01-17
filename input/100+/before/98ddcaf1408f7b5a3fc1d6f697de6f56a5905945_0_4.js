function(){
      var piecelength = this.waitingPiece[0].length - 1;
      for (var y = 0; y < piecelength; y++){
         for (var x = 1; x < 10; x++) {
            if (this.waitingPiece[0][y][x] === 1){
               $(this.waitDom[y][x - 4]).css('backgroundColor', '#' + this.waitingPiece.color);
            } else {
               $(this.waitDom[y][x - 4]).css('backgroundColor', '#aaa'); 
            }

         }
      }
   }