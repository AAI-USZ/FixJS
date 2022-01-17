function Game(settings) {
      var defaults, option, value;
      if (settings == null) {
        settings = {};
      }
      this._gameLoop = __bind(this._gameLoop, this);

      this.stepCount = 0;
      this.stepsPerFood = 20;
      this.timeStepRate = 100;
      this.gameIntervalID = null;
      defaults = {
        debugPrint: false,
        debugStep: false
      };
      for (option in defaults) {
        value = defaults[option];
        this[option] = value;
        if (settings[option]) {
          this[option] = settings[option];
        }
      }
      this.snake = new SNAKE.Snake(this);
      this.grid = new SNAKE.Grid(this, this.snake);
      this.graphics = new SNAKE.Graphics(this, this.grid);
      this._startGame();
    }