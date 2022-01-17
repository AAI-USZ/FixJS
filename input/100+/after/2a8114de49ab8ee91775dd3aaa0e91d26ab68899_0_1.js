function(){
      this.dom = this.domBuild('.play_board .block');
      this.waitDom = this.domBuild('.onDeck_board .block');
      this.waitingPiece = this.createPiece();
      this.playPiece = this.createPiece();
      this.renderWaiting();
      this.render();
      var that = this;
      //$.proxy(this.controls(), this)

      //event listener for key presses
      window.addEventListener('keydown', function(event) { that.key.onKeydown(event); }, false);
      window.addEventListener('keyup', function(event) { that.key.onKeyup(event); }, false);

      //controls game loop and key control timers 
      this.controlTimer = window.setInterval($.proxy(this.controls, this), 100);    
      this.time = window.setInterval($.proxy(this.gameLoop, this), 500);    
   }