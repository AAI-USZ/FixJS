function (start, end) {
        var data = datamap.getRange(start, end), text = '', r, rlen, c, clen;
        for (r = 0, rlen = data.length; r < rlen; r++) {
          for (c = 0, clen = data[r].length; c < clen; c++) {
            if (c > 0) {
              text += "\t";
            }
            text += data[r][c];
          }
          text += "\n";
        }
        return text;
      }