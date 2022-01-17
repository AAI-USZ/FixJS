function parse_newline() {
        var result0;
        
        reportFailures++;
        if (input.charCodeAt(pos.offset) === 10) {
          result0 = "\n";
          advance(pos, 1);
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"\\n\"");
          }
        }
        reportFailures--;
        if (reportFailures === 0 && result0 === null) {
          matchFailed("new line");
        }
        return result0;
      }