function parse_expression_4() {
        var result0, result1, result2, result3, result4;
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
          result1 = parse_quote();
          if (result1 !== null) {
            result2 = parse_expression();
            if (result2 !== null) {
              result3 = [];
              result4 = parse_space();
              while (result4 !== null) {
                result3.push(result4);
                result4 = parse_space();
              }
              if (result3 !== null) {
                result0 = [result0, result1, result2, result3];
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
          result0 = (function(offset, expr) {return ["quote", expr]})(pos0, result0[2]);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }