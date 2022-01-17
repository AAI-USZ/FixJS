function(coffee, baseline) {
      /*
          given an arbitrarily indented set of coffeescript, returns the delta
          between the first and last lines, in chars.
          Ignores leading/trailing whitespace lines
          If passed a baseline, uses that instead of own.
      */

      var lines, res, y, y_l;
      if (!(baseline != null)) {
        baseline = this._getIndentationBaseline(coffee);
      }
      if (!(baseline != null)) {
        res = 0;
      } else {
        lines = coffee.split("\n");
        while (lines.length && lines[lines.length - 1].match(/^[ ]*$/)) {
          lines.pop();
        }
        if (lines.length < 1) {
          res = 0;
        } else {
          y = lines[lines.length - 1];
          y_l = y.match(/[ ]*/)[0].length;
          res = y_l - baseline;
        }
      }
      return res;
    }