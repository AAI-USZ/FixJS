function(){
      this.dom = this.domBuild('.play_board .block');
      this.waitDom = this.domBuild('.onDeck_board .block');
      this.waitingPiece = this.createPiece();
      this.playPiece = this.createPiece();
      this.renderWaiting();
      this.render();
      var that = this;

      //controls game loop and key control timers 
      //this.controlTimer = window.setInterval($.proxy(this.controls, this), 100);    
      this.time = window.setInterval($.proxy(this.gameLoop, this), 200);    
      $(window).on('keydown', $.proxy(this.controls, this));
      //i$(window).off('keydown');
   }