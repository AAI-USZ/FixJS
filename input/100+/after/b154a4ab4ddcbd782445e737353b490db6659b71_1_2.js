function() {
      return [
        {
          "criterion": ["and", ["withinAbsTolerance", this.slope, ["lineSlope", this.annotations["singleLineGraphing"].name, 1], this.slopeTolerance], ["withinAbsTolerance", this.yIntercept, ["yIntercept", this.annotations["singleLineGraphing"].name, 1], this.yInterceptTolerance]],
          "step": "confirm_correct"
        }, {
          "criterion": ["withinAbsTolerance", this.slope, ["lineSlope", this.annotations["singleLineGraphing"].name, 1], this.slopeTolerance],
          "step": "incorrect_answer_but_slope_correct"
        }, {
          "criterion": ["withinAbsTolerance", this.yIntercept, ["yIntercept", this.annotations["singleLineGraphing"].name, 1], this.yInterceptTolerance],
          "step": "incorrect_answer_but_y_intercept_correct"
        }
      ];
    }