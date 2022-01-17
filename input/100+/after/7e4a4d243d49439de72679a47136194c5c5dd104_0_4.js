function parse_relationalExpressionOperator() {
        var cacheKey = "relationalExpressionOperator@" + pos.offset;
        var cachedResult = cache[cacheKey];
        if (cachedResult) {
          pos = clone(cachedResult.nextPos);
          return cachedResult.result;
        }
        
        var r0, r1, r2, r3, r4, r5;
        
        r1 = clone(pos);
        if (input.substr(pos.offset, 2) === "<=") {
          r0 = "<=";
          advance(pos, 2);
        } else {
          r0 = null;
          if (reportFailures === 0) {
            matchFailed("\"<=\"");
          }
        }
        if (r0 === null) {
          if (input.substr(pos.offset, 2) === ">=") {
            r0 = ">=";
            advance(pos, 2);
          } else {
            r0 = null;
            if (reportFailures === 0) {
              matchFailed("\">=\"");
            }
          }
          if (r0 === null) {
            if (input.charCodeAt(pos.offset) === 60) {
              r0 = "<";
              advance(pos, 1);
            } else {
              r0 = null;
              if (reportFailures === 0) {
                matchFailed("\"<\"");
              }
            }
            if (r0 === null) {
              if (input.charCodeAt(pos.offset) === 62) {
                r0 = ">";
                advance(pos, 1);
              } else {
                r0 = null;
                if (reportFailures === 0) {
                  matchFailed("\">\"");
                }
              }
              if (r0 === null) {
                r0 = parse_EXTENDS();
                if (r0 === null) {
                  r0 = parse_INSTANCEOF();
                  if (r0 === null) {
                    r0 = parse_IN();
                    if (r0 === null) {
                      r0 = parse_OF();
                    }
                  }
                }
              }
            }
          }
        }
        if (r0 !== null) {
          r0 = (function(offset, line, column, op) {
                var fn = function(left, right, raw, line, column){
                  return new constructorLookup[op](left, right).r(raw).p(line, column);
                };
                fn.raw = op;
                return fn;
              })(r1.offset, r1.line, r1.column, r0);
        }
        if (r0 === null) {
          pos = clone(r1);
        }
        if (r0 === null) {
          r1 = clone(pos);
          r2 = clone(pos);
          r3 = parse_NOT();
          if (r3 !== null) {
            r4 = parse__();
            if (r4 !== null) {
              r5 = parse_INSTANCEOF();
              if (r5 === null) {
                r5 = parse_IN();
                if (r5 === null) {
                  r5 = parse_OF();
                }
              }
              if (r5 !== null) {
                r0 = [r3, r4, r5];
              } else {
                r0 = null;
                pos = clone(r2);
              }
            } else {
              r0 = null;
              pos = clone(r2);
            }
          } else {
            r0 = null;
            pos = clone(r2);
          }
          if (r0 !== null) {
            r0 = (function(offset, line, column, ws, op) {
                  var fn = function(left, right, raw, line, column){
                    return new LogicalNotOp(new constructorLookup[op](left, right).r(raw).p(line, column)).r(raw).g();
                  };
                  fn.raw = 'not' + ws + op;
                  return fn;
                })(r1.offset, r1.line, r1.column, r4, r5);
          }
          if (r0 === null) {
            pos = clone(r1);
          }
        }
        
        cache[cacheKey] = {
          nextPos: clone(pos),
          result:  r0
        };
        return r0;
      }