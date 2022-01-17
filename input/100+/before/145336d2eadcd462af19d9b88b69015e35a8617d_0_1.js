function(lhsWidth, input) {
    var pad, rhsWidth, row, rows;
    rhsWidth = maxWidth - lhsWidth;
    pad = (Array(lhsWidth + 1)).join(' ');
    rows = (function() {
      var _results;
      _results = [];
      while (input.length) {
        row = input.slice(0, rhsWidth);
        input = input.slice(rhsWidth);
        _results.push(row);
      }
      return _results;
    })();
    return rows.join("\n" + pad);
  }