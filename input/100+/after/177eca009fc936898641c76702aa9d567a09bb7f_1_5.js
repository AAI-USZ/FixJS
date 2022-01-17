function parse_functionBody() {
        var result0, result1, result2, result3;
        var pos0, pos1;
        
        pos0 = clone(pos);
        pos1 = clone(pos);
        result0 = parse__();
        if (result0 !== null) {
          result1 = parse_TERMINDENT();
          if (result1 !== null) {
            result2 = parse_block();
            if (result2 !== null) {
              result3 = parse_DEDENT();
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
          result0 = (function(offset, line, column, ws, t, b, d) { return {block: b, raw: ws + t + b.raw + d}; })(pos0.offset, pos0.line, pos0.column, result0[0], result0[1], result0[2], result0[3]);
        }
        if (result0 === null) {
          pos = clone(pos0);
        }
        if (result0 === null) {
          pos0 = clone(pos);
          pos1 = clone(pos);
          result0 = parse__();
          if (result0 !== null) {
            result1 = parse_statement();
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
            result0 = (function(offset, line, column, ws, s) {
                  return {block: Nodes.Block.wrap(s), raw: ws + s.raw};
                })(pos0.offset, pos0.line, pos0.column, result0[0], result0[1]);
          }
          if (result0 === null) {
            pos = clone(pos0);
          }
        }
        return result0;
      }