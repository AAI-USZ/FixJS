function parse_expression_2() {
        var result0, result1, result2, result3, result4, result5, result6, result7, result8, result9, result10, result11;
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
                  result5 = [];
                  result6 = parse_expression();
                  while (result6 !== null) {
                    result5.push(result6);
                    result6 = parse_expression();
                  }
                  if (result5 !== null) {
                    result6 = [];
                    result7 = parse_space();
                    while (result7 !== null) {
                      result6.push(result7);
                      result7 = parse_space();
                    }
                    if (result6 !== null) {
                      result7 = parse_atomlist();
                      if (result7 !== null) {
                        result8 = [];
                        result9 = parse_space();
                        while (result9 !== null) {
                          result8.push(result9);
                          result9 = parse_space();
                        }
                        if (result8 !== null) {
                          if (input.charCodeAt(pos) === 41) {
                            result9 = ")";
                            pos++;
                          } else {
                            result9 = null;
                            if (reportFailures === 0) {
                              matchFailed("\")\"");
                            }
                          }
                          if (result9 !== null) {
                            result10 = [];
                            result11 = parse_space();
                            while (result11 !== null) {
                              result10.push(result11);
                              result11 = parse_space();
                            }
                            if (result10 !== null) {
                              result0 = [result0, result1, result2, result3, result4, result5, result6, result7, result8, result9, result10];
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
          result0 = (function(offset, left, expr, right) {return left.concat(expr).concat(right);})(pos0, result0[3], result0[5], result0[7]);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }