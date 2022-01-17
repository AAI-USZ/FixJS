function parse_arrayLiteralMemberList() {
        var result0, result1, result2, result3, result4, result5, result6;
        var pos0, pos1, pos2;
        
        pos0 = clone(pos);
        pos1 = clone(pos);
        result0 = parse_expression();
        if (result0 !== null) {
          result1 = parse__();
          if (result1 !== null) {
            result2 = [];
            pos2 = clone(pos);
            result3 = parse_arrayLiteralMemberSeparator();
            if (result3 !== null) {
              result4 = parse__();
              if (result4 !== null) {
                result5 = parse_expression();
                if (result5 !== null) {
                  result6 = parse__();
                  if (result6 !== null) {
                    result3 = [result3, result4, result5, result6];
                  } else {
                    result3 = null;
                    pos = clone(pos2);
                  }
                } else {
                  result3 = null;
                  pos = clone(pos2);
                }
              } else {
                result3 = null;
                pos = clone(pos2);
              }
            } else {
              result3 = null;
              pos = clone(pos2);
            }
            while (result3 !== null) {
              result2.push(result3);
              pos2 = clone(pos);
              result3 = parse_arrayLiteralMemberSeparator();
              if (result3 !== null) {
                result4 = parse__();
                if (result4 !== null) {
                  result5 = parse_expression();
                  if (result5 !== null) {
                    result6 = parse__();
                    if (result6 !== null) {
                      result3 = [result3, result4, result5, result6];
                    } else {
                      result3 = null;
                      pos = clone(pos2);
                    }
                  } else {
                    result3 = null;
                    pos = clone(pos2);
                  }
                } else {
                  result3 = null;
                  pos = clone(pos2);
                }
              } else {
                result3 = null;
                pos = clone(pos2);
              }
            }
            if (result2 !== null) {
              if (input.charCodeAt(pos.offset) === 44) {
                result3 = ",";
                advance(pos, 1);
              } else {
                result3 = null;
                if (reportFailures === 0) {
                  matchFailed("\",\"");
                }
              }
              result3 = result3 !== null ? result3 : "";
              if (result3 !== null) {
                result0 = [result0, result1, result2, result3];
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
          result0 = (function(offset, line, column, e, ws, es, trail) {
                var raw = e.raw + ws + es.map(function(e){ return e[0] + e[1] + e[2].raw + e[3]; }).join('') + trail;
                return {list: [e].concat(es.map(function(e){ return e[2]; })), raw: raw};
              })(pos0.offset, pos0.line, pos0.column, result0[0], result0[1], result0[2], result0[3]);
        }
        if (result0 === null) {
          pos = clone(pos0);
        }
        return result0;
      }