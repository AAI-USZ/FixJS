function parse_newlines() {
        var result0, result1;
        
        reportFailures++;
        result0 = [];
        if (input.charCodeAt(pos.offset) === 10) {
          result1 = "\n";
          advance(pos, 1);
        } else {
          result1 = null;
          if (reportFailures === 0) {
            matchFailed("\"\\n\"");
          }
        }
        while (result1 !== null) {
          result0.push(result1);
          if (input.charCodeAt(pos.offset) === 10) {
            result1 = "\n";
            advance(pos, 1);
          } else {
            result1 = null;
            if (reportFailures === 0) {
              matchFailed("\"\\n\"");
            }
          }
        }
        reportFailures--;
        if (reportFailures === 0 && result0 === null) {
          matchFailed("new lines");
        }
        return result0;
      }