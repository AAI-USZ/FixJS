function parse_whitespace() {
        var result0, result1, result2;
        var pos0, pos1;
        
        if (/^[\t\x0B\f \xA0\uFEFF\u1680\u180E\u2000-\u200A\u202F\u205F\u3000]/.test(input.charAt(pos.offset))) {
          result0 = input.charAt(pos.offset);
          advance(pos, 1);
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("[\\t\\x0B\\f \\xA0\\uFEFF\\u1680\\u180E\\u2000-\\u200A\\u202F\\u205F\\u3000]");
          }
        }
        if (result0 === null) {
          pos0 = clone(pos);
          pos1 = clone(pos);
          if (input.charCodeAt(pos.offset) === 92) {
            result0 = "\\";
            advance(pos, 1);
          } else {
            result0 = null;
            if (reportFailures === 0) {
              matchFailed("\"\\\\\"");
            }
          }
          if (result0 !== null) {
            if (input.charCodeAt(pos.offset) === 13) {
              result1 = "\r";
              advance(pos, 1);
            } else {
              result1 = null;
              if (reportFailures === 0) {
                matchFailed("\"\\r\"");
              }
            }
            result1 = result1 !== null ? result1 : "";
            if (result1 !== null) {
              if (input.charCodeAt(pos.offset) === 10) {
                result2 = "\n";
                advance(pos, 1);
              } else {
                result2 = null;
                if (reportFailures === 0) {
                  matchFailed("\"\\n\"");
                }
              }
              if (result2 !== null) {
                result0 = [result0, result1, result2];
              } else {
                result0 = null;
                pos = clone(pos1);
              }
            } else {
              result0 = null;
              pos = clone(pos1);
            }
          } else {
            result0 = null;
            pos = clone(pos1);
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