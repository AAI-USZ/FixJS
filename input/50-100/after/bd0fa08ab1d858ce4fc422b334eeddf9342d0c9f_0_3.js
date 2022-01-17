function(){
      console.log('touchdown'); 
      window.clearInterval(this.controlTimer);
      console.log(this.controlTimer);
      this.loadBoard();
      this.playPiece = this.waitingPiece;
      this.waitingPiece = this.createPiece();
      if (this.collisionTest('init') === true) {
         this.gameOver();
      }
      this.render();
      this.renderWaiting();
   }