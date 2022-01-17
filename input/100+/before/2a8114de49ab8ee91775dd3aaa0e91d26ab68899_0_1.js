function(){
      this.dom = this.domBuild('.play_board .block');
      this.waitDom = this.domBuild('.onDeck_board .block');
      this.waitingPiece = this.createPiece();
      this.playPiece = this.createPiece();
      this.renderWaiting();
      this.render();
      //this.controls();

      //makes setInterval scope the same as tetris object
      this.controlTimer = window.setInterval($.proxy(this.controls, this), 33);    
      this.time = window.setInterval($.proxy(this.gameLoop, this), 100);    
   }