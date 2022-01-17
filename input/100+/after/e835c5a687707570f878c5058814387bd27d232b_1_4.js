function(input, startRule) {
      var parseFunctions = {
        "comment": parse_comment,
        "expression": parse_expression,
        "single_atom": parse_single_atom,
        "parenthesis_expression": parse_parenthesis_expression,
        "expression_1": parse_expression_1,
        "expression_2": parse_expression_2,
        "expression_3": parse_expression_3,
        "validchar": parse_validchar,
        "space": parse_space,
        "whitespace": parse_whitespace,
        "table": parse_table,
        "newline": parse_newline,
        "atom": parse_atom,
        "number": parse_number,
        "float_num": parse_float_num,
        "integer": parse_integer,
        "decimal_digit": parse_decimal_digit,
        "non_zero_digit": parse_non_zero_digit,
        "string": parse_string,
        "spaceatom": parse_spaceatom,
        "atomlist": parse_atomlist,
        "quote": parse_quote
      };
      
      if (startRule !== undefined) {
        if (parseFunctions[startRule] === undefined) {
          throw new Error("Invalid rule name: " + quote(startRule) + ".");
        }
      } else {
        startRule = "expression";
      }
      
      var pos = 0;
      var reportFailures = 0;
      var rightmostFailuresPos = 0;
      var rightmostFailuresExpected = [];
      
      function padLeft(input, padding, length) {
        var result = input;
        
        var padLength = length - input.length;
        for (var i = 0; i < padLength; i++) {
          result = padding + result;
        }
        
        return result;
      }
      
      function escape(ch) {
        var charCode = ch.charCodeAt(0);
        var escapeChar;
        var length;
        
        if (charCode <= 0xFF) {
          escapeChar = 'x';
          length = 2;
        } else {
          escapeChar = 'u';
          length = 4;
        }
        
        return '\\' + escapeChar + padLeft(charCode.toString(16).toUpperCase(), '0', length);
      }
      
      function matchFailed(failure) {
        if (pos < rightmostFailuresPos) {
          return;
        }
        
        if (pos > rightmostFailuresPos) {
          rightmostFailuresPos = pos;
          rightmostFailuresExpected = [];
        }
        
        rightmostFailuresExpected.push(failure);
      }
      
      function parse_comment() {
        var result0, result1, result2, result3;
        var pos0, pos1, pos2;
        
        pos0 = pos;
        if (input.substr(pos, 2) === ";;") {
          result0 = ";;";
          pos += 2;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\";;\"");
          }
        }
        if (result0 !== null) {
          result1 = [];
          pos1 = pos;
          pos2 = pos;
          reportFailures++;
          result2 = parse_newline();
          reportFailures--;
          if (result2 === null) {
            result2 = "";
          } else {
            result2 = null;
            pos = pos2;
          }
          if (result2 !== null) {
            if (input.length > pos) {
              result3 = input.charAt(pos);
              pos++;
            } else {
              result3 = null;
              if (reportFailures === 0) {
                matchFailed("any character");
              }
            }
            if (result3 !== null) {
              result2 = [result2, result3];
            } else {
              result2 = null;
              pos = pos1;
            }
          } else {
            result2 = null;
            pos = pos1;
          }
          while (result2 !== null) {
            result1.push(result2);
            pos1 = pos;
            pos2 = pos;
            reportFailures++;
            result2 = parse_newline();
            reportFailures--;
            if (result2 === null) {
              result2 = "";
            } else {
              result2 = null;
              pos = pos2;
            }
            if (result2 !== null) {
              if (input.length > pos) {
                result3 = input.charAt(pos);
                pos++;
              } else {
                result3 = null;
                if (reportFailures === 0) {
                  matchFailed("any character");
                }
              }
              if (result3 !== null) {
                result2 = [result2, result3];
              } else {
                result2 = null;
                pos = pos1;
              }
            } else {
              result2 = null;
              pos = pos1;
            }
          }
          if (result1 !== null) {
            result0 = [result0, result1];
          } else {
            result0 = null;
            pos = pos0;
          }
        } else {
          result0 = null;
          pos = pos0;
        }
        return result0;
      }
      
      function parse_expression() {
        var result0;
        
        result0 = parse_single_atom();
        if (result0 === null) {
          result0 = parse_parenthesis_expression();
        }
        return result0;
      }
      
      function parse_single_atom() {
        var result0, result1, result2, result3;
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
          result1 = parse_atom();
          if (result1 !== null) {
            result2 = [];
            result3 = parse_space();
            while (result3 !== null) {
              result2.push(result3);
              result3 = parse_space();
            }
            if (result2 !== null) {
              result0 = [result0, result1, result2];
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
          result0 = (function(offset, expr) {return expr;})(pos0, result0[1]);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      
      function parse_parenthesis_expression() {
        var result0;
        
        result0 = parse_expression_3();
        if (result0 === null) {
          result0 = parse_expression_1();
          if (result0 === null) {
            result0 = parse_expression_2();
          }
        }
        return result0;
      }
      
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
      
      function parse_expression_3() {
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
      
      function parse_validchar() {
        var result0;
        
        if (/^[0-9a-zA-Z_?!+\-=@#$%^&*\/.]/.test(input.charAt(pos))) {
          result0 = input.charAt(pos);
          pos++;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("[0-9a-zA-Z_?!+\\-=@#$%^&*\\/.]");
          }
        }
        return result0;
      }
      
      function parse_space() {
        var result0;
        
        result0 = parse_whitespace();
        if (result0 === null) {
          result0 = parse_table();
          if (result0 === null) {
            result0 = parse_newline();
            if (result0 === null) {
              result0 = parse_comment();
            }
          }
        }
        return result0;
      }
      
      function parse_whitespace() {
        var result0;
        
        if (input.charCodeAt(pos) === 32) {
          result0 = " ";
          pos++;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\" \"");
          }
        }
        return result0;
      }
      
      function parse_table() {
        var result0;
        
        if (/^[\t]/.test(input.charAt(pos))) {
          result0 = input.charAt(pos);
          pos++;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("[\\t]");
          }
        }
        return result0;
      }
      
      function parse_newline() {
        var result0;
        
        if (/^[\r\n]/.test(input.charAt(pos))) {
          result0 = input.charAt(pos);
          pos++;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("[\\r\\n]");
          }
        }
        return result0;
      }
      
      function parse_atom() {
        var result0;
        
        result0 = parse_number();
        if (result0 === null) {
          result0 = parse_string();
        }
        return result0;
      }
      
      function parse_number() {
        var result0;
        
        result0 = parse_float_num();
        if (result0 === null) {
          result0 = parse_integer();
        }
        return result0;
      }
      
      function parse_float_num() {
        var result0, result1, result2, result3, result4;
        var pos0, pos1;
        
        pos0 = pos;
        pos1 = pos;
        if (input.substr(pos, 2) === "0.") {
          result0 = "0.";
          pos += 2;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"0.\"");
          }
        }
        if (result0 !== null) {
          result2 = parse_decimal_digit();
          if (result2 !== null) {
            result1 = [];
            while (result2 !== null) {
              result1.push(result2);
              result2 = parse_decimal_digit();
            }
          } else {
            result1 = null;
          }
          if (result1 !== null) {
            result0 = [result0, result1];
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset, rest) {return parseFloat("0." + rest.join(""));})(pos0, result0[1]);
        }
        if (result0 === null) {
          pos = pos0;
        }
        if (result0 === null) {
          pos0 = pos;
          pos1 = pos;
          result0 = parse_non_zero_digit();
          if (result0 !== null) {
            result1 = [];
            result2 = parse_decimal_digit();
            while (result2 !== null) {
              result1.push(result2);
              result2 = parse_decimal_digit();
            }
            if (result1 !== null) {
              if (input.charCodeAt(pos) === 46) {
                result2 = ".";
                pos++;
              } else {
                result2 = null;
                if (reportFailures === 0) {
                  matchFailed("\".\"");
                }
              }
              if (result2 !== null) {
                result4 = parse_decimal_digit();
                if (result4 !== null) {
                  result3 = [];
                  while (result4 !== null) {
                    result3.push(result4);
                    result4 = parse_decimal_digit();
                  }
                } else {
                  result3 = null;
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
            result0 = (function(offset, first, second, rest) {return parseFloat(first + second.join("") + "." + rest.join(""));})(pos0, result0[0], result0[1], result0[3]);
          }
          if (result0 === null) {
            pos = pos0;
          }
        }
        return result0;
      }
      
      function parse_integer() {
        var result0, result1, result2;
        var pos0, pos1;
        
        pos0 = pos;
        if (input.charCodeAt(pos) === 48) {
          result0 = "0";
          pos++;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"0\"");
          }
        }
        if (result0 !== null) {
          result0 = (function(offset) {return 0;})(pos0);
        }
        if (result0 === null) {
          pos = pos0;
        }
        if (result0 === null) {
          pos0 = pos;
          pos1 = pos;
          result0 = parse_non_zero_digit();
          if (result0 !== null) {
            result1 = [];
            result2 = parse_decimal_digit();
            while (result2 !== null) {
              result1.push(result2);
              result2 = parse_decimal_digit();
            }
            if (result1 !== null) {
              result0 = [result0, result1];
            } else {
              result0 = null;
              pos = pos1;
            }
          } else {
            result0 = null;
            pos = pos1;
          }
          if (result0 !== null) {
            result0 = (function(offset, first, rest) {return parseInt(first + rest.join(""));})(pos0, result0[0], result0[1]);
          }
          if (result0 === null) {
            pos = pos0;
          }
        }
        return result0;
      }
      
      function parse_decimal_digit() {
        var result0;
        
        if (/^[0-9]/.test(input.charAt(pos))) {
          result0 = input.charAt(pos);
          pos++;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("[0-9]");
          }
        }
        return result0;
      }
      
      function parse_non_zero_digit() {
        var result0;
        
        if (/^[1-9]/.test(input.charAt(pos))) {
          result0 = input.charAt(pos);
          pos++;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("[1-9]");
          }
        }
        return result0;
      }
      
      function parse_string() {
        var result0, result1;
        var pos0;
        
        pos0 = pos;
        result1 = parse_validchar();
        if (result1 !== null) {
          result0 = [];
          while (result1 !== null) {
            result0.push(result1);
            result1 = parse_validchar();
          }
        } else {
          result0 = null;
        }
        if (result0 !== null) {
          result0 = (function(offset, chars) {return chars.join("");})(pos0, result0);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      
      function parse_spaceatom() {
        var result0, result1;
        var pos0, pos1;
        
        pos0 = pos;
        pos1 = pos;
        result1 = parse_space();
        if (result1 !== null) {
          result0 = [];
          while (result1 !== null) {
            result0.push(result1);
            result1 = parse_space();
          }
        } else {
          result0 = null;
        }
        if (result0 !== null) {
          result1 = parse_atom();
          if (result1 !== null) {
            result0 = [result0, result1];
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset, second) {return second;})(pos0, result0[1]);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      
      function parse_atomlist() {
        var result0, result1;
        var pos0;
        
        pos0 = pos;
        result0 = [];
        result1 = parse_spaceatom();
        while (result1 !== null) {
          result0.push(result1);
          result1 = parse_spaceatom();
        }
        if (result0 !== null) {
          result0 = (function(offset, atoms) {return atoms;})(pos0, result0);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      
      function parse_quote() {
        var result0;
        
        if (input.charCodeAt(pos) === 39) {
          result0 = "'";
          pos++;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"'\"");
          }
        }
        return result0;
      }
      
      
      function cleanupExpected(expected) {
        expected.sort();
        
        var lastExpected = null;
        var cleanExpected = [];
        for (var i = 0; i < expected.length; i++) {
          if (expected[i] !== lastExpected) {
            cleanExpected.push(expected[i]);
            lastExpected = expected[i];
          }
        }
        return cleanExpected;
      }
      
      function computeErrorPosition() {
        /*
         * The first idea was to use |String.split| to break the input up to the
         * error position along newlines and derive the line and column from
         * there. However IE's |split| implementation is so broken that it was
         * enough to prevent it.
         */
        
        var line = 1;
        var column = 1;
        var seenCR = false;
        
        for (var i = 0; i < Math.max(pos, rightmostFailuresPos); i++) {
          var ch = input.charAt(i);
          if (ch === "\n") {
            if (!seenCR) { line++; }
            column = 1;
            seenCR = false;
          } else if (ch === "\r" || ch === "\u2028" || ch === "\u2029") {
            line++;
            column = 1;
            seenCR = true;
          } else {
            column++;
            seenCR = false;
          }
        }
        
        return { line: line, column: column };
      }
      
      
      var result = parseFunctions[startRule]();
      
      /*
       * The parser is now in one of the following three states:
       *
       * 1. The parser successfully parsed the whole input.
       *
       *    - |result !== null|
       *    - |pos === input.length|
       *    - |rightmostFailuresExpected| may or may not contain something
       *
       * 2. The parser successfully parsed only a part of the input.
       *
       *    - |result !== null|
       *    - |pos < input.length|
       *    - |rightmostFailuresExpected| may or may not contain something
       *
       * 3. The parser did not successfully parse any part of the input.
       *
       *   - |result === null|
       *   - |pos === 0|
       *   - |rightmostFailuresExpected| contains at least one failure
       *
       * All code following this comment (including called functions) must
       * handle these states.
       */
      if (result === null || pos !== input.length) {
        var offset = Math.max(pos, rightmostFailuresPos);
        var found = offset < input.length ? input.charAt(offset) : null;
        var errorPosition = computeErrorPosition();
        
        throw new this.SyntaxError(
          cleanupExpected(rightmostFailuresExpected),
          found,
          offset,
          errorPosition.line,
          errorPosition.column
        );
      }
      
      return result;
    }