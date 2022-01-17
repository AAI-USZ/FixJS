function parse_noPathDirective() {
        var result0, result1, result2, result3, result4;
        var pos0, pos1, pos2, pos3;
        
        pos0 = clone(pos);
        pos1 = clone(pos);
        if (input.charCodeAt(pos.offset) === 64) {
          result0 = "@";
          advance(pos, 1);
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"@\"");
          }
        }
        if (result0 !== null) {
          result1 = parse_identifier();
          if (result1 !== null) {
            result2 = [];
            pos2 = clone(pos);
            pos3 = clone(pos);
            if (input.charCodeAt(pos.offset) === 32) {
              result3 = " ";
              advance(pos, 1);
            } else {
              result3 = null;
              if (reportFailures === 0) {
                matchFailed("\" \"");
              }
            }
            if (result3 !== null) {
              result4 = parse_directiveParameter();
              if (result4 !== null) {
                result3 = [result3, result4];
              } else {
                result3 = null;
                pos = clone(pos3);
              }
            } else {
              result3 = null;
              pos = clone(pos3);
            }
            if (result3 !== null) {
              result3 = (function(offset, line, column, p) { return p; })(pos2.offset, pos2.line, pos2.column, result3[1]);
            }
            if (result3 === null) {
              pos = clone(pos2);
            }
            while (result3 !== null) {
              result2.push(result3);
              pos2 = clone(pos);
              pos3 = clone(pos);
              if (input.charCodeAt(pos.offset) === 32) {
                result3 = " ";
                advance(pos, 1);
              } else {
                result3 = null;
                if (reportFailures === 0) {
                  matchFailed("\" \"");
                }
              }
              if (result3 !== null) {
                result4 = parse_directiveParameter();
                if (result4 !== null) {
                  result3 = [result3, result4];
                } else {
                  result3 = null;
                  pos = clone(pos3);
                }
              } else {
                result3 = null;
                pos = clone(pos3);
              }
              if (result3 !== null) {
                result3 = (function(offset, line, column, p) { return p; })(pos2.offset, pos2.line, pos2.column, result3[1]);
              }
              if (result3 === null) {
                pos = clone(pos2);
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
          result0 = (function(offset, line, column, name, params) { return createDirective(name, undefined, params); })(pos0.offset, pos0.line, pos0.column, result0[1], result0[2]);
        }
        if (result0 === null) {
          pos = clone(pos0);
        }
        return result0;
      }