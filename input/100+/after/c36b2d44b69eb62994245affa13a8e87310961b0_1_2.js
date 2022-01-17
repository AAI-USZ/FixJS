function() {
      var count, dummy, field,
        _this = this;
      this.chartOptions = {
        chart: {
          renderTo: this.canvas
        },
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
        title: {}
      };
      count = -1;
      return this.chartOptions.series = (function() {
        var _i, _len, _ref4, _ref5, _results;
        _ref4 = data.fields;
        _results = [];
        for (_i = 0, _len = _ref4.length; _i < _len; _i++) {
          field = _ref4[_i];
          if (!((_ref5 = Number(field.typeID)) !== 37 && _ref5 !== 7)) {
            continue;
          }
          count += 1;
          _results.push(dummy = {
            data: [],
            color: '#000',
            marker: {
              symbol: globals.symbols[count % globals.symbols.length]
            },
            name: field.fieldName
          });
        }
        return _results;
      })();
    }