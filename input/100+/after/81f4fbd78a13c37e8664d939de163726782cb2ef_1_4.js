function() {
      var fieldIndex, groupIndex, index, _i, _ref4, _results;
      this.clearControls();
      this.drawControls();
      _results = [];
      for (index = _i = 0, _ref4 = this.chart.series.length - data.normalFields.length; 0 <= _ref4 ? _i < _ref4 : _i > _ref4; index = 0 <= _ref4 ? ++_i : --_i) {
        fieldIndex = data.normalFields[index % data.normalFields.length];
        groupIndex = Math.floor(index / data.normalFields.length);
        if ((__indexOf.call(globals.groupSelection, groupIndex) >= 0) && (__indexOf.call(globals.fieldSelection, fieldIndex) >= 0)) {
          _results.push(this.chart.series[index + data.normalFields.length].show());
        } else {
          _results.push(this.chart.series[index + data.normalFields.length].hide());
        }
      }
      return _results;
    }