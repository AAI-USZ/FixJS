function(){
      this.waitingPiece = this.createPiece();
      this.playPiece = this.createPiece();
      this.renderWaiting();
      this.render();
      var that = this;

      //makes setInterval scope the same as tetris object
      this.time = window.setInterval($.proxy(this.gameLoop, this), 500);    
   }