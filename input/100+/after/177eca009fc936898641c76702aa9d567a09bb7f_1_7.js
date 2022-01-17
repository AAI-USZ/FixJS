function parse_arrayLiteralBody() {
        var result0, result1, result2;
        var pos0, pos1;
        
        pos0 = clone(pos);
        pos1 = clone(pos);
        result0 = parse_TERMINDENT();
        if (result0 !== null) {
          result1 = parse_arrayLiteralMemberList();
          if (result1 !== null) {
            result2 = parse_DEDENT();
            if (result2 !== null) {
              result0 = [result0, result1, result2];
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
          result0 = (function(offset, line, column, t, members, d) { return {list: members.list, raw: t + members.raw + d}; })(pos0.offset, pos0.line, pos0.column, result0[0], result0[1], result0[2]);
        }
        if (result0 === null) {
          pos = clone(pos0);
        }
        if (result0 === null) {
          pos0 = clone(pos);
          result0 = parse_arrayLiteralMemberList();
          result0 = result0 !== null ? result0 : "";
          if (result0 !== null) {
            result0 = (function(offset, line, column, members) { return members ? members : {list: [], raw: ''}; })(pos0.offset, pos0.line, pos0.column, result0);
          }
          if (result0 === null) {
            pos = clone(pos0);
          }
        }
        return result0;
      }