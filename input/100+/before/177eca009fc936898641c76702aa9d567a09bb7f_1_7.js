function parse_objectLiteral() {
        var result0, result1, result2, result3, result4;
        var pos0, pos1, pos2;
        
        pos0 = clone(pos);
        pos1 = clone(pos);
        if (input.charCodeAt(pos.offset) === 123) {
          result0 = "{";
          advance(pos, 1);
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"{\"");
          }
        }
        if (result0 !== null) {
          result1 = parse_TERMINATOR();
          if (result1 === null) {
            result1 = parse__();
          }
          if (result1 !== null) {
            pos2 = clone(pos);
            result2 = parse_objectLiteralMemberList();
            if (result2 !== null) {
              result3 = parse__();
              if (result3 !== null) {
                result2 = [result2, result3];
              } else {
                result2 = null;
                pos = clone(pos2);
              }
            } else {
              result2 = null;
              pos = clone(pos2);
            }
            result2 = result2 !== null ? result2 : "";
            if (result2 !== null) {
              result3 = parse_TERMINATOR();
              result3 = result3 !== null ? result3 : "";
              if (result3 !== null) {
                if (input.charCodeAt(pos.offset) === 125) {
                  result4 = "}";
                  advance(pos, 1);
                } else {
                  result4 = null;
                  if (reportFailures === 0) {
                    matchFailed("\"}\"");
                  }
                }
                if (result4 !== null) {
                  result0 = [result0, result1, result2, result3, result4];
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
          result0 = (function(offset, line, column, ws, members, t) {
            var raw = "{" + ws + (members ? members[0].raw + members[1] : '') + t + "}";
            members = members ? members[0].list : [];
            return new Nodes.ObjectInitialiser(members).r(raw).p(line, column);
          })(pos0.offset, pos0.line, pos0.column, result0[1], result0[2], result0[3]);
        }
        if (result0 === null) {
          pos = clone(pos0);
        }
        return result0;
      }