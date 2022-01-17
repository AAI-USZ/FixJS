function() {
      var gameLoop,
        _this = this;
      this.foodCount = 0;
      this.foodItems = new Game.FoodQueue(this);
      this.snake.setup(this);
      this.dropFood();
      clearInterval(this.gameIntervalID);
      gameLoop = function() {
        _this.snake.move();
        return _this.graphics.update();
      };
      if (Game.debugStep) {
        this._setupGameStep(gameLoop);
        return;
      }
      this.gameIntervalID = setInterval(gameLoop, this.timeStepRate);
      return gameLoop();
    }