function(offset) {
      var line, lines, row, _len;
      lines = editorDoc.getAllLines();
      row = 0;
      for (row = 0, _len = lines.length; row < _len; row++) {
        line = lines[row];
        if (offset <= line.length) break;
        offset -= lines[row].length + 1;
      }
      return {
        row: row,
        column: offset
      };
    }