function parse_path() {
        var result0, result1, result2;
        var pos0, pos1;
        
        reportFailures++;
        pos0 = clone(pos);
        pos1 = clone(pos);
        result0 = parse_key();
        result0 = result0 !== null ? result0 : "";
        if (result0 !== null) {
          result2 = parse_nestedKey();
          if (result2 !== null) {
            result1 = [];
            while (result2 !== null) {
              result1.push(result2);
              result2 = parse_nestedKey();
            }
          } else {
            result1 = null;
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
          result0 = (function(offset, line, column, k, d) {
            d = d[0]; 
            if (k && d) {
              d.unshift(k);
              return [false, d];;
            }
            return [true, d];
          })(pos0.offset, pos0.line, pos0.column, result0[0], result0[1]);
        }
        if (result0 === null) {
          pos = clone(pos0);
        }
        if (result0 === null) {
          pos0 = clone(pos);
          if (input.charCodeAt(pos.offset) === 46) {
            result0 = ".";
            advance(pos, 1);
          } else {
            result0 = null;
            if (reportFailures === 0) {
              matchFailed("\".\"");
            }
          }
          if (result0 !== null) {
            result0 = (function(offset, line, column) { return [true, []] })(pos0.offset, pos0.line, pos0.column);
          }
          if (result0 === null) {
            pos = clone(pos0);
          }
        }
        reportFailures--;
        if (reportFailures === 0 && result0 === null) {
          matchFailed("path");
        }
        return result0;
      }