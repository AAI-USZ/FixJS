function(){
      this.waitingPiece = this.createPiece();
      this.playPiece = this.createPiece();
      this.renderWaiting();
      this.render();
      var that = this;
      this.controls();

      //makes setInterval scope the same as tetris object
      //this.controlTimer = window.setInterval($.proxy(this.controls, this), 0);    
      this.time = window.setInterval($.proxy(this.gameLoop, this), 100);    
   }