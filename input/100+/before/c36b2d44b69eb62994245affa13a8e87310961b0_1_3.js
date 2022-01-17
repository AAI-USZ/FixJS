function() {
      var index, ser, _i, _len, _ref5;
      this.buildOptions();
      if (this.chart != null) {
        this.chart.destroy();
      }
      this.chart = new Highcharts.Chart(this.chartOptions);
      this.buildSeries();
      _ref5 = this.chart.series;
      for (_i = 0, _len = _ref5.length; _i < _len; _i++) {
        ser = _ref5[_i];
        index = data.normalFields[ser.index];
        if (__indexOf.call(globals.fieldSelection, index) >= 0) {
          ser.show();
        } else {
          ser.hide();
        }
      }
      ($('#' + this.canvas)).show();
      return this.update();
    }