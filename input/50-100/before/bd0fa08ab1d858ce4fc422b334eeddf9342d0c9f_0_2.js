function(){
      console.log('moveDown--------------');
      var space = [[0,0,0,0,0,0,0,0,0,0,0,0]];
      for (var i = 0; i < 4; i++) {
         this.playPiece[i].unshift.apply(this.playPiece[i], space);
      }
      this.render();
   }