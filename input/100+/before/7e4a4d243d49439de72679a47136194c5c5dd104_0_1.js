function parse_logicalOrExpression() {
        var cacheKey = "logicalOrExpression@" + pos.offset;
        var cachedResult = cache[cacheKey];
        if (cachedResult) {
          pos = clone(cachedResult.nextPos);
          return cachedResult.result;
        }
        
        var r0, r1, r2, r3, r4, r5, r6, r7, r8, r9, r10, r11;
        
        r1 = clone(pos);
        r2 = clone(pos);
        r3 = parse_logicalAndExpression();
        if (r3 !== null) {
          r5 = clone(pos);
          r6 = parse__();
          if (r6 !== null) {
            if (input.substr(pos.offset, 2) === "||") {
              r7 = "||";
              advance(pos, 2);
            } else {
              r7 = null;
              if (reportFailures === 0) {
                matchFailed("\"||\"");
              }
            }
            if (r7 === null) {
              r7 = parse_OR();
            }
            if (r7 !== null) {
              r9 = clone(pos);
              reportFailures++;
              if (input.charCodeAt(pos.offset) === 61) {
                r8 = "=";
                advance(pos, 1);
              } else {
                r8 = null;
                if (reportFailures === 0) {
                  matchFailed("\"=\"");
                }
              }
              reportFailures--;
              if (r8 === null) {
                r8 = "";
              } else {
                r8 = null;
                pos = clone(r9);
              }
              if (r8 !== null) {
                r9 = parse_INDENT();
                r9 = r9 !== null ? r9 : "";
                if (r9 !== null) {
                  r10 = parse__();
                  if (r10 !== null) {
                    r11 = parse_functionLiteral();
                    if (r11 === null) {
                      r11 = parse_logicalOrExpression();
                    }
                    if (r11 !== null) {
                      r4 = [r6, r7, r8, r9, r10, r11];
                    } else {
                      r4 = null;
                      pos = clone(r5);
                    }
                  } else {
                    r4 = null;
                    pos = clone(r5);
                  }
                } else {
                  r4 = null;
                  pos = clone(r5);
                }
              } else {
                r4 = null;
                pos = clone(r5);
              }
            } else {
              r4 = null;
              pos = clone(r5);
            }
          } else {
            r4 = null;
            pos = clone(r5);
          }
          r4 = r4 !== null ? r4 : "";
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
          r0 = (function(offset, line, column, left, right) {
              if(!right) return left;
              var raw = left.raw + right[0] + right[1] + right[3] + right[4] + right[5].raw;
              return new Nodes.LogicalOrOp(left, right[5]).r(raw).p(line, column);
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