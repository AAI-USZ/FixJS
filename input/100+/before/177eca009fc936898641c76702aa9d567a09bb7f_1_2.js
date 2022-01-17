function parse_TERM() {
        var result0;
        var pos0;
        
        pos0 = clone(pos);
        if (/^[\n\uEFFF]/.test(input.charAt(pos.offset))) {
          result0 = input.charAt(pos.offset);
          advance(pos, 1);
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("[\\n\\uEFFF]");
          }
        }
        if (result0 !== null) {
          result0 = (function(offset, line, column) { return '\n'; })(pos0.offset, pos0.line, pos0.column);
        }
        if (result0 === null) {
          pos = clone(pos0);
        }
        return result0;
      }