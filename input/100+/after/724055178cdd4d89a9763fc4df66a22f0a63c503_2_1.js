function(_super) {

    __extends(Scatter, _super);

    function Scatter(canvas) {
      this.canvas = canvas;
    }

    Scatter.prototype.buildOptions = function() {
      Scatter.__super__.buildOptions.call(this);
      this.chartOptions.type = "scatter";
      return this.chartOptions.title = {
        text: "Scatter"
      };
    };

    Scatter.prototype.drawControls = function() {
      this.drawGroupControls();
      this.drawXAxisControls();
      return this.drawFieldChkControls();
    };

    return Scatter;

  }