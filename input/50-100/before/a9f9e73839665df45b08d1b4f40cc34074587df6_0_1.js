function() {
      console.log('grid!');
      console.log(this.grid);
      this.snake = this.grid.snake = new SNAKE.Snake(this);
      this.grid.makeWorld();
      return this._startGame();
    }