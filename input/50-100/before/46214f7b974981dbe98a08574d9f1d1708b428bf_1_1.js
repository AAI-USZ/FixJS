function() {
      if ((this.stepCount % this.stepsPerFood) === 0) {
        this.grid.dropFood();
      }
      this.snake.move();
      this.graphics.update();
      return this.stepCount += 1;
    }