function() {
      this.log("in _gameLoop: snake has moves: " + (this.snake.moves._queue.toString()));
      if ((this.stepCount % this.stepsPerFood) === 0) {
        this.grid.dropFood();
      }
      this.snake.move();
      this.graphics.update();
      return this.stepCount += 1;
    }