function(){
      this.waitingPiece = this.createPiece();
      this.playPiece = this.createPiece();
      this.renderWaiting();
      this.render();
      var that = this;
      //console.log(this.pieces.z()[0]);
      //console.log(this.createPiece()[0]);
      //console.log(this.playPiece[0]);


      //makes setInterval scope the same as tetris object
      this.time = window.setInterval($.proxy(this.gameLoop, this), 500);    
   }