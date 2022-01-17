function() {
      console.log('restarting');
      this.snake = new Game.Snake;
      this.makeWorld();
      return this.startGame();
    }