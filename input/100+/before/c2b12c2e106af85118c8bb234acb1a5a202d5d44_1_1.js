function parse_indent() {
        var result0, result1;
        var pos0;
        
        reportFailures++;
        pos0 = clone(pos);
        result0 = [];
        if (/^[ \t]/.test(input.charAt(pos.offset))) {
          result1 = input.charAt(pos.offset);
          advance(pos, 1);
        } else {
          result1 = null;
          if (reportFailures === 0) {
            matchFailed("[ \\t]");
          }
        }
        while (result1 !== null) {
          result0.push(result1);
          if (/^[ \t]/.test(input.charAt(pos.offset))) {
            result1 = input.charAt(pos.offset);
            advance(pos, 1);
          } else {
            result1 = null;
            if (reportFailures === 0) {
              matchFailed("[ \\t]");
            }
          }
        }
        if (result0 !== null) {
          result0 = (function(offset, line, column, s) { return parseIndent(s, line); })(pos0.offset, pos0.line, pos0.column, result0);
        }
        if (result0 === null) {
          pos = clone(pos0);
        }
        reportFailures--;
        if (reportFailures === 0 && result0 === null) {
          matchFailed("indent");
        }
        return result0;
      }