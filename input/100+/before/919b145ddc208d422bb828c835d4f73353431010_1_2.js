function parse_objectLiteralMemberList() {
        var cacheKey = "objectLiteralMemberList@" + pos.offset;
        var cachedResult = cache[cacheKey];
        if (cachedResult) {
          pos = clone(cachedResult.nextPos);
          return cachedResult.result;
        }
        
        var r0, r1, r2, r3, r4, r5, r6, r7, r8;
        
        r1 = clone(pos);
        r2 = clone(pos);
        r3 = parse_objectLiteralMember();
        if (r3 !== null) {
          r4 = [];
          r6 = clone(pos);
          r7 = parse_arrayLiteralMemberSeparator();
          if (r7 !== null) {
            r8 = parse_objectLiteralMember();
            if (r8 !== null) {
              r5 = [r7, r8];
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
            r7 = parse_arrayLiteralMemberSeparator();
            if (r7 !== null) {
              r8 = parse_objectLiteralMember();
              if (r8 !== null) {
                r5 = [r7, r8];
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
          r0 = (function(offset, line, column, e, es) {
                var raw = e.raw + es.map(function(e){ return e[0] + e[1].raw; }).join('');
                return {list: [e].concat(es.map(function(e){ return e[1]; })), raw: raw};
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