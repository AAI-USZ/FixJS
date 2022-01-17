function parse_logicalOrExpression() {
        var cacheKey = "logicalOrExpression@" + pos.offset;
        var cachedResult = cache[cacheKey];
        if (cachedResult) {
          pos = clone(cachedResult.nextPos);
          return cachedResult.result;
        }
        
        var r0, r1, r2, r3, r4, r5, r6, r7, r8, r9, r10, r11, r12;
        
        r1 = clone(pos);
        r2 = clone(pos);
        r3 = parse_logicalAndExpression();
        if (r3 !== null) {
          r4 = [];
          r6 = clone(pos);
          r7 = parse__();
          if (r7 !== null) {
            if (input.substr(pos.offset, 2) === "||") {
              r8 = "||";
              advance(pos, 2);
            } else {
              r8 = null;
              if (reportFailures === 0) {
                matchFailed("\"||\"");
              }
            }
            if (r8 === null) {
              r8 = parse_OR();
            }
            if (r8 !== null) {
              r10 = clone(pos);
              reportFailures++;
              if (input.charCodeAt(pos.offset) === 61) {
                r9 = "=";
                advance(pos, 1);
              } else {
                r9 = null;
                if (reportFailures === 0) {
                  matchFailed("\"=\"");
                }
              }
              reportFailures--;
              if (r9 === null) {
                r9 = "";
              } else {
                r9 = null;
                pos = clone(r10);
              }
              if (r9 !== null) {
                r10 = parse_INDENT();
                r10 = r10 !== null ? r10 : "";
                if (r10 !== null) {
                  r11 = parse__();
                  if (r11 !== null) {
                    r12 = parse_functionLiteral();
                    if (r12 === null) {
                      r12 = parse_logicalAndExpression();
                    }
                    if (r12 !== null) {
                      r5 = [r7, r8, r9, r10, r11, r12];
                    } else {
                      r5 = null;
                      pos = clone(r6);
                    }
                  } else {
                    r5 = null;
                    pos = clone(r6);
                  }
                } else {
                  r5 = null;
                  pos = clone(r6);
                }
              } else {
                r5 = null;
                pos = clone(r6);
              }
            } else {
              r5 = null;
              pos = clone(r6);
            }
          } else {
            r5 = null;
            pos = clone(r6);
          }
          while (r5 !== null) {
            r4.push(r5);
            r6 = clone(pos);
            r7 = parse__();
            if (r7 !== null) {
              if (input.substr(pos.offset, 2) === "||") {
                r8 = "||";
                advance(pos, 2);
              } else {
                r8 = null;
                if (reportFailures === 0) {
                  matchFailed("\"||\"");
                }
              }
              if (r8 === null) {
                r8 = parse_OR();
              }
              if (r8 !== null) {
                r10 = clone(pos);
                reportFailures++;
                if (input.charCodeAt(pos.offset) === 61) {
                  r9 = "=";
                  advance(pos, 1);
                } else {
                  r9 = null;
                  if (reportFailures === 0) {
                    matchFailed("\"=\"");
                  }
                }
                reportFailures--;
                if (r9 === null) {
                  r9 = "";
                } else {
                  r9 = null;
                  pos = clone(r10);
                }
                if (r9 !== null) {
                  r10 = parse_INDENT();
                  r10 = r10 !== null ? r10 : "";
                  if (r10 !== null) {
                    r11 = parse__();
                    if (r11 !== null) {
                      r12 = parse_functionLiteral();
                      if (r12 === null) {
                        r12 = parse_logicalAndExpression();
                      }
                      if (r12 !== null) {
                        r5 = [r7, r8, r9, r10, r11, r12];
                      } else {
                        r5 = null;
                        pos = clone(r6);
                      }
                    } else {
                      r5 = null;
                      pos = clone(r6);
                    }
                  } else {
                    r5 = null;
                    pos = clone(r6);
                  }
                } else {
                  r5 = null;
                  pos = clone(r6);
                }
              } else {
                r5 = null;
                pos = clone(r6);
              }
            } else {
              r5 = null;
              pos = clone(r6);
            }
          }
          if (r4 !== null) {
            r0 = [r3, r4];
          } else {
            r0 = null;
            pos = clone(r2);
          }
        } else {
          r0 = null;
          pos = clone(r2);
        }
        if (r0 !== null) {
          r0 = (function(offset, line, column, left, rights) {
              if(!rights) return left;
              return foldl(function(expr, right){
                var raw = left.raw + right[0] + right[1] + right[3] + right[4] + right[5].raw;
                return new Nodes.LogicalOrOp(expr, right[5]).r(raw).p(line, column);
              }, left, rights);
            })(r1.offset, r1.line, r1.column, r3, r4);
        }
        if (r0 === null) {
          pos = clone(r1);
        }
        
        cache[cacheKey] = {
          nextPos: clone(pos),
          result:  r0
        };
        return r0;
      }