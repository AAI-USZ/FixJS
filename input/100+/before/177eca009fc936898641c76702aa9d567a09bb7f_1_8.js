function parse_objectLiteralMemberList() {
        var result0, result1, result2, result3, result4, result5, result6, result7;
        var pos0, pos1, pos2;
        
        pos0 = clone(pos);
        pos1 = clone(pos);
        result0 = parse_objectLiteralMember();
        if (result0 !== null) {
          result1 = [];
          pos2 = clone(pos);
          result2 = parse_TERMINATOR();
          result2 = result2 !== null ? result2 : "";
          if (result2 !== null) {
            result3 = parse__();
            if (result3 !== null) {
              if (input.charCodeAt(pos.offset) === 44) {
                result4 = ",";
                advance(pos, 1);
              } else {
                result4 = null;
                if (reportFailures === 0) {
                  matchFailed("\",\"");
                }
              }
              if (result4 === null) {
                result4 = parse_TERMINATOR();
              }
              if (result4 !== null) {
                result5 = parse_TERMINATOR();
                result5 = result5 !== null ? result5 : "";
                if (result5 !== null) {
                  result6 = parse__();
                  if (result6 !== null) {
                    result7 = parse_objectLiteralMember();
                    if (result7 !== null) {
                      result2 = [result2, result3, result4, result5, result6, result7];
                    } else {
                      result2 = null;
                      pos = clone(pos2);
                    }
                  } else {
                    result2 = null;
                    pos = clone(pos2);
                  }
                } else {
                  result2 = null;
                  pos = clone(pos2);
                }
              } else {
                result2 = null;
                pos = clone(pos2);
              }
            } else {
              result2 = null;
              pos = clone(pos2);
            }
          } else {
            result2 = null;
            pos = clone(pos2);
          }
          while (result2 !== null) {
            result1.push(result2);
            pos2 = clone(pos);
            result2 = parse_TERMINATOR();
            result2 = result2 !== null ? result2 : "";
            if (result2 !== null) {
              result3 = parse__();
              if (result3 !== null) {
                if (input.charCodeAt(pos.offset) === 44) {
                  result4 = ",";
                  advance(pos, 1);
                } else {
                  result4 = null;
                  if (reportFailures === 0) {
                    matchFailed("\",\"");
                  }
                }
                if (result4 === null) {
                  result4 = parse_TERMINATOR();
                }
                if (result4 !== null) {
                  result5 = parse_TERMINATOR();
                  result5 = result5 !== null ? result5 : "";
                  if (result5 !== null) {
                    result6 = parse__();
                    if (result6 !== null) {
                      result7 = parse_objectLiteralMember();
                      if (result7 !== null) {
                        result2 = [result2, result3, result4, result5, result6, result7];
                      } else {
                        result2 = null;
                        pos = clone(pos2);
                      }
                    } else {
                      result2 = null;
                      pos = clone(pos2);
                    }
                  } else {
                    result2 = null;
                    pos = clone(pos2);
                  }
                } else {
                  result2 = null;
                  pos = clone(pos2);
                }
              } else {
                result2 = null;
                pos = clone(pos2);
              }
            } else {
              result2 = null;
              pos = clone(pos2);
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
          result0 = (function(offset, line, column, e, es) {
                var raw = e.raw + es.map(function(e){ return e[0] + e[1] + e[2] + e[3] + e[4] + e[5].raw; }).join('');
                return {list: [e.member].concat(es.map(function(e){ return e[5].member; })), raw: raw};
              })(pos0.offset, pos0.line, pos0.column, result0[0], result0[1]);
        }
        if (result0 === null) {
          pos = clone(pos0);
        }
        return result0;
      }