function() {
      Scatter.__super__.buildOptions.call(this);
      this.chartOptions.type = "scatter";
      return $.extend(true, this.chartOptions, {
        title: {
          text: "Scatter"
        }
      });
    }