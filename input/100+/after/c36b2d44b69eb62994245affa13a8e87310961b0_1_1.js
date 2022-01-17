function() {
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
      }