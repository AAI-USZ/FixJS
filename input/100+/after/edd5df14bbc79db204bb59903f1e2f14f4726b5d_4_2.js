function(obj) {
      /*
          replaces tabs with spaces in their coffee regions
      */

      var item, _i, _len, _ref, _ref1, _results;
      if ((_ref = obj[0]) === "INDENTED_TOFFEE_ZONE" || _ref === "TOFFEE_ZONE" || _ref === "COFFEE_ZONE") {
        _ref1 = obj[1];
        _results = [];
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          item = _ref1[_i];
          _results.push(this._cleanTabs(item));
        }
        return _results;
      } else if (obj[0] === "COFFEE") {
        return obj[1] = obj[1].replace(/\t/g, this._tabAsSpaces());
      }
    }