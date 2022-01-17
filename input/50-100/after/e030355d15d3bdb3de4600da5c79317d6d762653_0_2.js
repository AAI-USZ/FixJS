function(offset) {
      var line, lines, row, _i, _len;
      lines = editorDoc.getAllLines();
      row = 0;
      for (row = _i = 0, _len = lines.length; _i < _len; row = ++_i) {
        line = lines[row];
        if (offset <= line.length) {
          break;
        }
        offset -= lines[row].length + 1;
      }
      return {
        row: row,
        column: offset
      };
    }