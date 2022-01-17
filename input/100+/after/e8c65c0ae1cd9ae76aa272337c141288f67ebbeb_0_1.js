function Grid(snake, squaresX, squaresY) {
      this.snake = snake;
      this.squaresX = squaresX != null ? squaresX : 25;
      this.squaresY = squaresY != null ? squaresY : 15;
      this._squareToEdges = __bind(this._squareToEdges, this);

      this.dropFood = __bind(this.dropFood, this);

      this.graphics = null;
      this.gameIntervalID = null;
      this.timeStepRate = 100;
      this.squareWidth = 15;
      this.squareHeight = 15;
      this.squareTypes = ['food', 'snake'];
      this.maxFood = 4;
      this.foodCount = 0;
      this.foodItems = null;
      this.foodDropRate = this.timeStepRate * 20;
      this.foodIntervalID = null;
    }