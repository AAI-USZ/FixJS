function parse_TERM() {
        var result0, result1;
        var pos0, pos1;
        
        pos0 = clone(pos);
        pos1 = clone(pos);
        if (input.charCodeAt(pos.offset) === 13) {
          result0 = "\r";
          advance(pos, 1);
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"\\r\"");
          }
        }
        result0 = result0 !== null ? result0 : "";
        if (result0 !== null) {
          if (input.charCodeAt(pos.offset) === 10) {
            result1 = "\n";
            advance(pos, 1);
          } else {
            result1 = null;
            if (reportFailures === 0) {
              matchFailed("\"\\n\"");
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
          result0 = (function(offset, line, column) { return '\n'; })(pos0.offset, pos0.line, pos0.column);
        }
        if (result0 === null) {
          pos = clone(pos0);
        }
        if (result0 === null) {
          pos0 = clone(pos);
          if (input.charCodeAt(pos.offset) === 61439) {
            result0 = "\uEFFF";
            advance(pos, 1);
          } else {
            result0 = null;
            if (reportFailures === 0) {
              matchFailed("\"\\uEFFF\"");
            }
          }
          if (result0 !== null) {
            result0 = (function(offset, line, column) { return ''; })(pos0.offset, pos0.line, pos0.column);
          }
          if (result0 === null) {
            pos = clone(pos0);
          }
        }
        return result0;
      }