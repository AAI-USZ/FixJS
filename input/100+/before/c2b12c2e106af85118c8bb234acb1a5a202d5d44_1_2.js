function parse_directiveParameter() {
        var result0, result1;
        var pos0, pos1, pos2;
        
        reportFailures++;
        pos0 = clone(pos);
        pos1 = clone(pos);
        pos2 = clone(pos);
        result0 = parse_identifier();
        if (result0 !== null) {
          if (input.charCodeAt(pos.offset) === 61) {
            result1 = "=";
            advance(pos, 1);
          } else {
            result1 = null;
            if (reportFailures === 0) {
              matchFailed("\"=\"");
            }
          }
          if (result1 !== null) {
            result0 = [result0, result1];
          } else {
            result0 = null;
            pos = clone(pos2);
          }
        } else {
          result0 = null;
          pos = clone(pos2);
        }
        result0 = result0 !== null ? result0 : "";
        if (result0 !== null) {
          result1 = parse_doubleQuotedText();
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
          result0 = (function(offset, line, column, name, value) { return { name: name ? name[0] : 'text', value: value }; })(pos0.offset, pos0.line, pos0.column, result0[0], result0[1]);
        }
        if (result0 === null) {
          pos = clone(pos0);
        }
        reportFailures--;
        if (reportFailures === 0 && result0 === null) {
          matchFailed("directive parameter");
        }
        return result0;
      }