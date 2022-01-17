function parse_regexp() {
        var result0, result1, result2, result3, result4;
        var pos0, pos1, pos2;
        
        pos0 = clone(pos);
        pos1 = clone(pos);
        if (input.substr(pos.offset, 3) === "///") {
          result0 = "///";
          advance(pos, 3);
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"///\"");
          }
        }
        if (result0 !== null) {
          pos2 = clone(pos);
          if (/^[ \r\n]/.test(input.charAt(pos.offset))) {
            result3 = input.charAt(pos.offset);
            advance(pos, 1);
          } else {
            result3 = null;
            if (reportFailures === 0) {
              matchFailed("[ \\r\\n]");
            }
          }
          if (result3 !== null) {
            result2 = [];
            while (result3 !== null) {
              result2.push(result3);
              if (/^[ \r\n]/.test(input.charAt(pos.offset))) {
                result3 = input.charAt(pos.offset);
                advance(pos, 1);
              } else {
                result3 = null;
                if (reportFailures === 0) {
                  matchFailed("[ \\r\\n]");
                }
              }
            }
          } else {
            result2 = null;
          }
          if (result2 !== null) {
            result2 = (function(offset, line, column) { return [new Nodes.String('').g().p(line, column)]; })(pos2.offset, pos2.line, pos2.column);
          }
          if (result2 === null) {
            pos = clone(pos2);
          }
          if (result2 === null) {
            pos2 = clone(pos);
            if (/^[^\\\/#[ \r\n]/.test(input.charAt(pos.offset))) {
              result3 = input.charAt(pos.offset);
              advance(pos, 1);
            } else {
              result3 = null;
              if (reportFailures === 0) {
                matchFailed("[^\\\\\\/#[ \\r\\n]");
              }
            }
            if (result3 !== null) {
              result2 = [];
              while (result3 !== null) {
                result2.push(result3);
                if (/^[^\\\/#[ \r\n]/.test(input.charAt(pos.offset))) {
                  result3 = input.charAt(pos.offset);
                  advance(pos, 1);
                } else {
                  result3 = null;
                  if (reportFailures === 0) {
                    matchFailed("[^\\\\\\/#[ \\r\\n]");
                  }
                }
              }
            } else {
              result2 = null;
            }
            if (result2 !== null) {
              result2 = (function(offset, line, column, s) { return [new Nodes.String(s.join('')).g().p(line, column)]; })(pos2.offset, pos2.line, pos2.column, result2);
            }
            if (result2 === null) {
              pos = clone(pos2);
            }
            if (result2 === null) {
              result2 = parse_hereregexpData();
            }
          }
          if (result2 !== null) {
            result1 = [];
            while (result2 !== null) {
              result1.push(result2);
              pos2 = clone(pos);
              if (/^[ \r\n]/.test(input.charAt(pos.offset))) {
                result3 = input.charAt(pos.offset);
                advance(pos, 1);
              } else {
                result3 = null;
                if (reportFailures === 0) {
                  matchFailed("[ \\r\\n]");
                }
              }
              if (result3 !== null) {
                result2 = [];
                while (result3 !== null) {
                  result2.push(result3);
                  if (/^[ \r\n]/.test(input.charAt(pos.offset))) {
                    result3 = input.charAt(pos.offset);
                    advance(pos, 1);
                  } else {
                    result3 = null;
                    if (reportFailures === 0) {
                      matchFailed("[ \\r\\n]");
                    }
                  }
                }
              } else {
                result2 = null;
              }
              if (result2 !== null) {
                result2 = (function(offset, line, column) { return [new Nodes.String('').g().p(line, column)]; })(pos2.offset, pos2.line, pos2.column);
              }
              if (result2 === null) {
                pos = clone(pos2);
              }
              if (result2 === null) {
                pos2 = clone(pos);
                if (/^[^\\\/#[ \r\n]/.test(input.charAt(pos.offset))) {
                  result3 = input.charAt(pos.offset);
                  advance(pos, 1);
                } else {
                  result3 = null;
                  if (reportFailures === 0) {
                    matchFailed("[^\\\\\\/#[ \\r\\n]");
                  }
                }
                if (result3 !== null) {
                  result2 = [];
                  while (result3 !== null) {
                    result2.push(result3);
                    if (/^[^\\\/#[ \r\n]/.test(input.charAt(pos.offset))) {
                      result3 = input.charAt(pos.offset);
                      advance(pos, 1);
                    } else {
                      result3 = null;
                      if (reportFailures === 0) {
                        matchFailed("[^\\\\\\/#[ \\r\\n]");
                      }
                    }
                  }
                } else {
                  result2 = null;
                }
                if (result2 !== null) {
                  result2 = (function(offset, line, column, s) { return [new Nodes.String(s.join('')).g().p(line, column)]; })(pos2.offset, pos2.line, pos2.column, result2);
                }
                if (result2 === null) {
                  pos = clone(pos2);
                }
                if (result2 === null) {
                  result2 = parse_hereregexpData();
                }
              }
            }
          } else {
            result1 = null;
          }
          if (result1 !== null) {
            if (input.substr(pos.offset, 3) === "///") {
              result2 = "///";
              advance(pos, 3);
            } else {
              result2 = null;
              if (reportFailures === 0) {
                matchFailed("\"///\"");
              }
            }
            if (result2 !== null) {
              result3 = [];
              if (/^[gimy]/.test(input.charAt(pos.offset))) {
                result4 = input.charAt(pos.offset);
                advance(pos, 1);
              } else {
                result4 = null;
                if (reportFailures === 0) {
                  matchFailed("[gimy]");
                }
              }
              while (result4 !== null) {
                result3.push(result4);
                if (/^[gimy]/.test(input.charAt(pos.offset))) {
                  result4 = input.charAt(pos.offset);
                  advance(pos, 1);
                } else {
                  result4 = null;
                  if (reportFailures === 0) {
                    matchFailed("[gimy]");
                  }
                }
              }
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
          result0 = (function(offset, line, column, es, flags) {
              if(!isValidRegExpFlags(flags))
                throw new SyntaxError(['regular expression flags'], 'regular expression flags', offset, line, column);
              if(!flags) flags = [];
              var interp = createInterpolation(foldl(function(memo, e){ return memo.concat(e); }, [], es));
              if(interp instanceof Nodes.String) return new Nodes.RegExp(interp.data, flags).p(line, column);
              return new Nodes.HeregExp(interp, flags).p(line, column);
            })(pos0.offset, pos0.line, pos0.column, result0[1], result0[3]);
        }
        if (result0 === null) {
          pos = clone(pos0);
        }
        if (result0 === null) {
          pos0 = clone(pos);
          pos1 = clone(pos);
          if (input.charCodeAt(pos.offset) === 47) {
            result0 = "/";
            advance(pos, 1);
          } else {
            result0 = null;
            if (reportFailures === 0) {
              matchFailed("\"/\"");
            }
          }
          if (result0 !== null) {
            result1 = [];
            pos2 = clone(pos);
            if (/^[^\/\\[]/.test(input.charAt(pos.offset))) {
              result3 = input.charAt(pos.offset);
              advance(pos, 1);
            } else {
              result3 = null;
              if (reportFailures === 0) {
                matchFailed("[^\\/\\\\[]");
              }
            }
            if (result3 !== null) {
              result2 = [];
              while (result3 !== null) {
                result2.push(result3);
                if (/^[^\/\\[]/.test(input.charAt(pos.offset))) {
                  result3 = input.charAt(pos.offset);
                  advance(pos, 1);
                } else {
                  result3 = null;
                  if (reportFailures === 0) {
                    matchFailed("[^\\/\\\\[]");
                  }
                }
              }
            } else {
              result2 = null;
            }
            if (result2 !== null) {
              result2 = (function(offset, line, column, d) { return d.join(''); })(pos2.offset, pos2.line, pos2.column, result2);
            }
            if (result2 === null) {
              pos = clone(pos2);
            }
            if (result2 === null) {
              result2 = parse_regexpData();
            }
            while (result2 !== null) {
              result1.push(result2);
              pos2 = clone(pos);
              if (/^[^\/\\[]/.test(input.charAt(pos.offset))) {
                result3 = input.charAt(pos.offset);
                advance(pos, 1);
              } else {
                result3 = null;
                if (reportFailures === 0) {
                  matchFailed("[^\\/\\\\[]");
                }
              }
              if (result3 !== null) {
                result2 = [];
                while (result3 !== null) {
                  result2.push(result3);
                  if (/^[^\/\\[]/.test(input.charAt(pos.offset))) {
                    result3 = input.charAt(pos.offset);
                    advance(pos, 1);
                  } else {
                    result3 = null;
                    if (reportFailures === 0) {
                      matchFailed("[^\\/\\\\[]");
                    }
                  }
                }
              } else {
                result2 = null;
              }
              if (result2 !== null) {
                result2 = (function(offset, line, column, d) { return d.join(''); })(pos2.offset, pos2.line, pos2.column, result2);
              }
              if (result2 === null) {
                pos = clone(pos2);
              }
              if (result2 === null) {
                result2 = parse_regexpData();
              }
            }
            if (result1 !== null) {
              if (input.charCodeAt(pos.offset) === 47) {
                result2 = "/";
                advance(pos, 1);
              } else {
                result2 = null;
                if (reportFailures === 0) {
                  matchFailed("\"/\"");
                }
              }
              if (result2 !== null) {
                result3 = [];
                if (/^[gimy]/.test(input.charAt(pos.offset))) {
                  result4 = input.charAt(pos.offset);
                  advance(pos, 1);
                } else {
                  result4 = null;
                  if (reportFailures === 0) {
                    matchFailed("[gimy]");
                  }
                }
                while (result4 !== null) {
                  result3.push(result4);
                  if (/^[gimy]/.test(input.charAt(pos.offset))) {
                    result4 = input.charAt(pos.offset);
                    advance(pos, 1);
                  } else {
                    result4 = null;
                    if (reportFailures === 0) {
                      matchFailed("[gimy]");
                    }
                  }
                }
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
            result0 = (function(offset, line, column, d, flags) {
                if(!isValidRegExpFlags(flags))
                  throw new SyntaxError(['regular expression flags'], 'regular expression flags', offset, line, column);
                return new Nodes.RegExp(d ? d.join('') : '', flags || []).p(line, column);;
              })(pos0.offset, pos0.line, pos0.column, result0[1], result0[3]);
          }
          if (result0 === null) {
            pos = clone(pos0);
          }
        }
        return result0;
      }