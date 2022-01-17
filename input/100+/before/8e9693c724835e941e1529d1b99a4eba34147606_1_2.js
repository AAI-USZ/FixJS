function(coffee) {
      var line, lines, res, _i, _len;
      res = null;
      lines = coffee.split("\n");
      if (lines.length !== 0) {
        for (_i = 0, _len = lines.length; _i < _len; _i++) {
          line = lines[_i];
          if (!line.match(/^[ ]*$/)) {
            res = line.match(/[ ]*/)[0].length;
            break;
          }
        }
      }
      return res;
    }