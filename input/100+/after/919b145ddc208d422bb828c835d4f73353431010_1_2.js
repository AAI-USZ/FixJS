function parse_objectLiteralMemberList() {
        var cacheKey = "objectLiteralMemberList@" + pos.offset;
        var cachedResult = cache[cacheKey];
        if (cachedResult) {
          pos = clone(cachedResult.nextPos);
          return cachedResult.result;
        }
        
        var r0, r1, r2, r3, r4, r5, r6, r7, r8, r9, r10, r11;
        
        r1 = clone(pos);
        r2 = clone(pos);
        r3 = parse_objectLiteralMember();
        if (r3 !== null) {
          r4 = parse__();
          if (r4 !== null) {
            r5 = [];
            r7 = clone(pos);
            r8 = parse_arrayLiteralMemberSeparator();
            if (r8 !== null) {
              r9 = parse__();
              if (r9 !== null) {
                r10 = parse_objectLiteralMember();
                if (r10 !== null) {
                  r11 = parse__();
                  if (r11 !== null) {
                    r6 = [r8, r9, r10, r11];
                  } else {
                    r6 = null;
                    pos = clone(r7);
                  }
                } else {
                  r6 = null;
                  pos = clone(r7);
                }
              } else {
                r6 = null;
                pos = clone(r7);
              }
            } else {
              r6 = null;
              pos = clone(r7);
            }
            while (r6 !== null) {
              r5.push(r6);
              r7 = clone(pos);
              r8 = parse_arrayLiteralMemberSeparator();
              if (r8 !== null) {
                r9 = parse__();
                if (r9 !== null) {
                  r10 = parse_objectLiteralMember();
                  if (r10 !== null) {
                    r11 = parse__();
                    if (r11 !== null) {
                      r6 = [r8, r9, r10, r11];
                    } else {
                      r6 = null;
                      pos = clone(r7);
                    }
                  } else {
                    r6 = null;
                    pos = clone(r7);
                  }
                } else {
                  r6 = null;
                  pos = clone(r7);
                }
              } else {
                r6 = null;
                pos = clone(r7);
              }
            }
            if (r5 !== null) {
              if (input.charCodeAt(pos.offset) === 44) {
                r6 = ",";
                advance(pos, 1);
              } else {
                r6 = null;
                if (reportFailures === 0) {
                  matchFailed("\",\"");
                }
              }
              r6 = r6 !== null ? r6 : "";
              if (r6 !== null) {
                r0 = [r3, r4, r5, r6];
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
        } else {
          r0 = null;
          pos = clone(r2);
        }
        if (r0 !== null) {
          r0 = (function(offset, line, column, e, ws, es, trail) {
                var raw = e.raw + ws + es.map(function(e){ return e[0] + e[1] + e[2].raw + e[3]; }).join('') + trail;
                return {list: [e].concat(es.map(function(e){ return e[2]; })), raw: raw};
              })(r1.offset, r1.line, r1.column, r3, r4, r5, r6);
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