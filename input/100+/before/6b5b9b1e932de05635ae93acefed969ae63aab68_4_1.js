function parse_partial() {
        var result0, result1, result2, result3, result4, result5, result6, result7;
        var pos0, pos1, pos2;
        
        reportFailures++;
        pos0 = clone(pos);
        pos1 = clone(pos);
        result0 = parse_ld();
        if (result0 !== null) {
          if (input.charCodeAt(pos.offset) === 62) {
            result1 = ">";
            advance(pos, 1);
          } else {
            result1 = null;
            if (reportFailures === 0) {
              matchFailed("\">\"");
            }
          }
          if (result1 !== null) {
            pos2 = clone(pos);
            result2 = parse_key();
            if (result2 !== null) {
              result2 = (function(offset, line, column, k) {return ["literal", k]})(pos2.offset, pos2.line, pos2.column, result2);
            }
            if (result2 === null) {
              pos = clone(pos2);
            }
            if (result2 === null) {
              result2 = parse_inline();
            }
            if (result2 !== null) {
              result3 = parse_context();
              if (result3 !== null) {
                result4 = parse_params();
                if (result4 !== null) {
                  result5 = [];
                  result6 = parse_ws();
                  while (result6 !== null) {
                    result5.push(result6);
                    result6 = parse_ws();
                  }
                  if (result5 !== null) {
                    if (input.charCodeAt(pos.offset) === 47) {
                      result6 = "/";
                      advance(pos, 1);
                    } else {
                      result6 = null;
                      if (reportFailures === 0) {
                        matchFailed("\"/\"");
                      }
                    }
                    if (result6 !== null) {
                      result7 = parse_rd();
                      if (result7 !== null) {
                        result0 = [result0, result1, result2, result3, result4, result5, result6, result7];
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
          } else {
            result0 = null;
            pos = clone(pos1);
          }
        } else {
          result0 = null;
          pos = clone(pos1);
        }
        if (result0 !== null) {
          result0 = (function(offset, line, column, n, c, p) { return ["partial", n, c, p] })(pos0.offset, pos0.line, pos0.column, result0[2], result0[3], result0[4]);
        }
        if (result0 === null) {
          pos = clone(pos0);
        }
        reportFailures--;
        if (reportFailures === 0 && result0 === null) {
          matchFailed("partial");
        }
        return result0;
      }