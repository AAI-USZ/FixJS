function parse_assignmentOp() {
        var result0, result1, result2, result3, result4, result5, result6, result7, result8;
        var pos0, pos1, pos2, pos3;
        
        pos0 = clone(pos);
        pos1 = clone(pos);
        result0 = parse_Assignable();
        if (result0 !== null) {
          result1 = parse__();
          if (result1 !== null) {
            if (input.charCodeAt(pos.offset) === 61) {
              result2 = "=";
              advance(pos, 1);
            } else {
              result2 = null;
              if (reportFailures === 0) {
                matchFailed("\"=\"");
              }
            }
            if (result2 !== null) {
              pos2 = clone(pos);
              reportFailures++;
              if (input.charCodeAt(pos.offset) === 61) {
                result3 = "=";
                advance(pos, 1);
              } else {
                result3 = null;
                if (reportFailures === 0) {
                  matchFailed("\"=\"");
                }
              }
              reportFailures--;
              if (result3 === null) {
                result3 = "";
              } else {
                result3 = null;
                pos = clone(pos2);
              }
              if (result3 !== null) {
                result4 = parse__();
                if (result4 !== null) {
                  pos2 = clone(pos);
                  result5 = parse_secondaryExpression();
                  if (result5 !== null) {
                    result5 = (function(offset, line, column, e) { return {raw: e.raw, expr: e} })(pos2.offset, pos2.line, pos2.column, result5);
                  }
                  if (result5 === null) {
                    pos = clone(pos2);
                  }
                  if (result5 === null) {
                    pos2 = clone(pos);
                    pos3 = clone(pos);
                    result5 = parse_TERMINDENT();
                    if (result5 !== null) {
                      result6 = parse_secondaryExpression();
                      if (result6 !== null) {
                        result7 = parse_TERMINATOR();
                        result7 = result7 !== null ? result7 : "";
                        if (result7 !== null) {
                          result8 = parse_DEDENT();
                          if (result8 !== null) {
                            result5 = [result5, result6, result7, result8];
                          } else {
                            result5 = null;
                            pos = clone(pos3);
                          }
                        } else {
                          result5 = null;
                          pos = clone(pos3);
                        }
                      } else {
                        result5 = null;
                        pos = clone(pos3);
                      }
                    } else {
                      result5 = null;
                      pos = clone(pos3);
                    }
                    if (result5 !== null) {
                      result5 = (function(offset, line, column, t0, e, t1, d) { return {raw: t0 + e.raw + t1 + d, expr: e} })(pos2.offset, pos2.line, pos2.column, result5[0], result5[1], result5[2], result5[3]);
                    }
                    if (result5 === null) {
                      pos = clone(pos2);
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
          result0 = (function(offset, line, column, left, ws0, ws1, right) {
                var raw = left.raw + ws0 + '=' + ws1 + right.raw;
                return new Nodes.AssignOp(left, right.expr).r(raw).p(line, column);
              })(pos0.offset, pos0.line, pos0.column, result0[0], result0[1], result0[4], result0[5]);
        }
        if (result0 === null) {
          pos = clone(pos0);
        }
        return result0;
      }