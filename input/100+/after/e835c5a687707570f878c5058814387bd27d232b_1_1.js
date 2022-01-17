function parse_expression_1() {
        var result0, result1, result2, result3, result4, result5, result6, result7;
        var pos0, pos1;
        
        pos0 = pos;
        pos1 = pos;
        result0 = [];
        result1 = parse_space();
        while (result1 !== null) {
          result0.push(result1);
          result1 = parse_space();
        }
        if (result0 !== null) {
          if (input.charCodeAt(pos) === 40) {
            result1 = "(";
            pos++;
          } else {
            result1 = null;
            if (reportFailures === 0) {
              matchFailed("\"(\"");
            }
          }
          if (result1 !== null) {
            result2 = [];
            result3 = parse_space();
            while (result3 !== null) {
              result2.push(result3);
              result3 = parse_space();
            }
            if (result2 !== null) {
              result3 = parse_atomlist();
              if (result3 !== null) {
                result4 = [];
                result5 = parse_space();
                while (result5 !== null) {
                  result4.push(result5);
                  result5 = parse_space();
                }
                if (result4 !== null) {
                  if (input.charCodeAt(pos) === 41) {
                    result5 = ")";
                    pos++;
                  } else {
                    result5 = null;
                    if (reportFailures === 0) {
                      matchFailed("\")\"");
                    }
                  }
                  if (result5 !== null) {
                    result6 = [];
                    result7 = parse_space();
                    while (result7 !== null) {
                      result6.push(result7);
                      result7 = parse_space();
                    }
                    if (result6 !== null) {
                      result0 = [result0, result1, result2, result3, result4, result5, result6];
                    } else {
                      result0 = null;
                      pos = pos1;
                    }
                  } else {
                    result0 = null;
                    pos = pos1;
                  }
                } else {
                  result0 = null;
                  pos = pos1;
                }
              } else {
                result0 = null;
                pos = pos1;
              }
            } else {
              result0 = null;
              pos = pos1;
            }
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset, atoms) {return atoms;})(pos0, result0[3]);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }