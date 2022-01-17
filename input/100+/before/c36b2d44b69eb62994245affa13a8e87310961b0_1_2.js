function() {
      var count, dummy, field,
        _this = this;
      this.chartOptions = {
        chart: {
          renderTo: this.canvas
        },
        colors: globals.getColors(),
        credits: {
          enabled: false
        },
        plotOptions: {
          series: {
            events: {
              legendItemClick: function(event) {
                var index;
                index = data.normalFields[event.target.index];
                if (event.target.visible) {
                  arrayRemove(globals.fieldSelection, index);
                } else {
                  globals.fieldSelection.push(index);
                }
                return _this.update();
              }
            }
          }
        },
        series: [],
        symbols: globals.getSymbols(),
        title: {}
      };
      count = -1;
      return this.chartOptions.series = (function() {
        var _i, _len, _ref5, _ref6, _results;
        _ref5 = data.fields;
        _results = [];
        for (_i = 0, _len = _ref5.length; _i < _len; _i++) {
          field = _ref5[_i];
          if (!((_ref6 = Number(field.typeID)) !== 37 && _ref6 !== 7)) {
            continue;
          }
          count += 1;
          _results.push(dummy = {
            data: [],
            color: '#000',
            marker: {
              symbol: this.chartOptions.symbols[count % this.chartOptions.symbols.length]
            },
            name: field.fieldName
          });
        }
        return _results;
      }).call(this);
    }