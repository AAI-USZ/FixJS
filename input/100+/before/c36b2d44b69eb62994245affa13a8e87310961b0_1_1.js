function() {
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
      }