function(range) {
      var i, line, lines, offset, _len;
      lines = editorDoc.getLines(0, range.start.row);
      offset = 0;
      for (i = 0, _len = lines.length; i < _len; i++) {
        line = lines[i];
        offset += i < range.start.row ? line.length : range.start.column;
      }
      return offset + range.start.row;
    }