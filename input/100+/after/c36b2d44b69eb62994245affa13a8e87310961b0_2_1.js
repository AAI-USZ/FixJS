function() {
      var fieldIndex, groupIndex, options, symbolIndex, _results;
      Scatter.__super__.buildOptions.call(this);
      this.chartOptions;
      $.extend(true, this.chartOptions, {
        chart: {
          type: "line"
        },
        title: {
          text: "Scatter"
        }
      });
      _results = [];
      for (groupIndex in data.groups) {
        _results.push((function() {
          var _ref, _results1;
          _ref = data.normalFields;
          _results1 = [];
          for (symbolIndex in _ref) {
            fieldIndex = _ref[symbolIndex];
            options = {
              data: data.xySelector(globals.xAxis, fieldIndex, groupIndex),
              showInLegend: false,
              color: globals.colors[groupIndex % globals.colors.length],
              symbol: globals.symbols[symbolIndex % globals.symbols.length]
            };
            console.log([symbolIndex, fieldIndex]);
            _results1.push(this.chartOptions.series.push(options));
          }
          return _results1;
        }).call(this));
      }
      return _results;
    }