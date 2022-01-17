function parse_DEDENT() {
        var result0, result1;
        var pos0, pos1;
        
        pos0 = clone(pos);
        pos1 = clone(pos);
        result0 = parse__();
        if (result0 !== null) {
          if (input.charCodeAt(pos.offset) === 61438) {
            result1 = "\uEFFE";
            advance(pos, 1);
          } else {
            result1 = null;
            if (reportFailures === 0) {
              matchFailed("\"\\uEFFE\"");
            }
          }
          if (result1 !== null) {
            result0 = [result0, result1];
          } else {
            result0 = null;
            pos = clone(pos1);
          }
        } else {
          result0 = null;
          pos = clone(pos1);
        }
        if (result0 !== null) {
          result0 = (function(offset, line, column, ws) { return ws; })(pos0.offset, pos0.line, pos0.column, result0[0]);
        }
        if (result0 === null) {
          pos = clone(pos0);
        }
        return result0;
      }