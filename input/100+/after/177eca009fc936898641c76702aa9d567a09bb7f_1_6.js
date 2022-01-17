function parse_arrayLiteral() {
        var result0, result1, result2, result3, result4, result5;
        var pos0, pos1;
        
        pos0 = clone(pos);
        pos1 = clone(pos);
        if (input.charCodeAt(pos.offset) === 91) {
          result0 = "[";
          advance(pos, 1);
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"[\"");
          }
        }
        if (result0 !== null) {
          result1 = parse__();
          if (result1 !== null) {
            result2 = parse_arrayLiteralBody();
            if (result2 !== null) {
              result3 = parse_TERMINATOR();
              result3 = result3 !== null ? result3 : "";
              if (result3 !== null) {
                result4 = parse__();
                if (result4 !== null) {
                  if (input.charCodeAt(pos.offset) === 93) {
                    result5 = "]";
                    advance(pos, 1);
                  } else {
                    result5 = null;
                    if (reportFailures === 0) {
                      matchFailed("\"]\"");
                    }
                  }
                  if (result5 !== null) {
                    result0 = [result0, result1, result2, result3, result4, result5];
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
          result0 = (function(offset, line, column, ws0, members, t, ws1) {
              var raw = "[" + ws0 + members.raw + t + ws1 + "]";
              members = members.list;
              return new Nodes.ArrayInitialiser(members).r(raw).p(line, column);
            })(pos0.offset, pos0.line, pos0.column, result0[1], result0[2], result0[3], result0[4]);
        }
        if (result0 === null) {
          pos = clone(pos0);
        }
        return result0;
      }