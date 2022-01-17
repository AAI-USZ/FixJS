function() {
      var index, ser, _i, _len, _ref4;
      this.buildOptions();
      if (this.chart != null) {
        this.chart.destroy();
      }
      this.chart = new Highcharts.Chart(this.chartOptions);
      _ref4 = this.chart.series.slice(0, data.normalFields.length);
      for (_i = 0, _len = _ref4.length; _i < _len; _i++) {
        ser = _ref4[_i];
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