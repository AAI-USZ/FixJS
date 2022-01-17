function(pos, square) {
        var type, _i, _len, _ref, _results;
        _ref = _this.grid.squareTypes;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          type = _ref[_i];
          if (square[type] === true) {
            square[type] = _this.appendDOMNode(pos, type);
          }
          if (square[type]) {
            _results.push(_this.setNodePosition(square[type], pos));
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      }