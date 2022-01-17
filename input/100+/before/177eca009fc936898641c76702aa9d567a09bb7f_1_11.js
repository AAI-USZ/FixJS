function parse_UnusedJSKeywords() {
        var result0, result1;
        var pos0, pos1;
        
        pos0 = clone(pos);
        if (input.substr(pos.offset, 4) === "case") {
          result0 = "case";
          advance(pos, 4);
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"case\"");
          }
        }
        if (result0 === null) {
          if (input.substr(pos.offset, 7) === "default") {
            result0 = "default";
            advance(pos, 7);
          } else {
            result0 = null;
            if (reportFailures === 0) {
              matchFailed("\"default\"");
            }
          }
          if (result0 === null) {
            if (input.substr(pos.offset, 8) === "function") {
              result0 = "function";
              advance(pos, 8);
            } else {
              result0 = null;
              if (reportFailures === 0) {
                matchFailed("\"function\"");
              }
            }
            if (result0 === null) {
              if (input.substr(pos.offset, 3) === "var") {
                result0 = "var";
                advance(pos, 3);
              } else {
                result0 = null;
                if (reportFailures === 0) {
                  matchFailed("\"var\"");
                }
              }
              if (result0 === null) {
                if (input.substr(pos.offset, 4) === "void") {
                  result0 = "void";
                  advance(pos, 4);
                } else {
                  result0 = null;
                  if (reportFailures === 0) {
                    matchFailed("\"void\"");
                  }
                }
                if (result0 === null) {
                  if (input.substr(pos.offset, 4) === "with") {
                    result0 = "with";
                    advance(pos, 4);
                  } else {
                    result0 = null;
                    if (reportFailures === 0) {
                      matchFailed("\"with\"");
                    }
                  }
                  if (result0 === null) {
                    if (input.substr(pos.offset, 5) === "const") {
                      result0 = "const";
                      advance(pos, 5);
                    } else {
                      result0 = null;
                      if (reportFailures === 0) {
                        matchFailed("\"const\"");
                      }
                    }
                    if (result0 === null) {
                      if (input.substr(pos.offset, 3) === "let") {
                        result0 = "let";
                        advance(pos, 3);
                      } else {
                        result0 = null;
                        if (reportFailures === 0) {
                          matchFailed("\"let\"");
                        }
                      }
                      if (result0 === null) {
                        if (input.substr(pos.offset, 4) === "enum") {
                          result0 = "enum";
                          advance(pos, 4);
                        } else {
                          result0 = null;
                          if (reportFailures === 0) {
                            matchFailed("\"enum\"");
                          }
                        }
                        if (result0 === null) {
                          if (input.substr(pos.offset, 6) === "export") {
                            result0 = "export";
                            advance(pos, 6);
                          } else {
                            result0 = null;
                            if (reportFailures === 0) {
                              matchFailed("\"export\"");
                            }
                          }
                          if (result0 === null) {
                            if (input.substr(pos.offset, 6) === "import") {
                              result0 = "import";
                              advance(pos, 6);
                            } else {
                              result0 = null;
                              if (reportFailures === 0) {
                                matchFailed("\"import\"");
                              }
                            }
                            if (result0 === null) {
                              pos1 = clone(pos);
                              if (input.substr(pos.offset, 6) === "native") {
                                result0 = "native";
                                advance(pos, 6);
                              } else {
                                result0 = null;
                                if (reportFailures === 0) {
                                  matchFailed("\"native\"");
                                }
                              }
                              if (result0 !== null) {
                                if (input.substr(pos.offset, 10) === "implements") {
                                  result1 = "implements";
                                  advance(pos, 10);
                                } else {
                                  result1 = null;
                                  if (reportFailures === 0) {
                                    matchFailed("\"implements\"");
                                  }
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
                              if (result0 === null) {
                                if (input.substr(pos.offset, 9) === "interface") {
                                  result0 = "interface";
                                  advance(pos, 9);
                                } else {
                                  result0 = null;
                                  if (reportFailures === 0) {
                                    matchFailed("\"interface\"");
                                  }
                                }
                                if (result0 === null) {
                                  if (input.substr(pos.offset, 7) === "package") {
                                    result0 = "package";
                                    advance(pos, 7);
                                  } else {
                                    result0 = null;
                                    if (reportFailures === 0) {
                                      matchFailed("\"package\"");
                                    }
                                  }
                                  if (result0 === null) {
                                    if (input.substr(pos.offset, 7) === "private") {
                                      result0 = "private";
                                      advance(pos, 7);
                                    } else {
                                      result0 = null;
                                      if (reportFailures === 0) {
                                        matchFailed("\"private\"");
                                      }
                                    }
                                    if (result0 === null) {
                                      if (input.substr(pos.offset, 9) === "protected") {
                                        result0 = "protected";
                                        advance(pos, 9);
                                      } else {
                                        result0 = null;
                                        if (reportFailures === 0) {
                                          matchFailed("\"protected\"");
                                        }
                                      }
                                      if (result0 === null) {
                                        if (input.substr(pos.offset, 6) === "public") {
                                          result0 = "public";
                                          advance(pos, 6);
                                        } else {
                                          result0 = null;
                                          if (reportFailures === 0) {
                                            matchFailed("\"public\"");
                                          }
                                        }
                                        if (result0 === null) {
                                          if (input.substr(pos.offset, 6) === "static") {
                                            result0 = "static";
                                            advance(pos, 6);
                                          } else {
                                            result0 = null;
                                            if (reportFailures === 0) {
                                              matchFailed("\"static\"");
                                            }
                                          }
                                          if (result0 === null) {
                                            if (input.substr(pos.offset, 5) === "yield") {
                                              result0 = "yield";
                                              advance(pos, 5);
                                            } else {
                                              result0 = null;
                                              if (reportFailures === 0) {
                                                matchFailed("\"yield\"");
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        if (result0 !== null) {
          pos1 = clone(pos);
          reportFailures++;
          result1 = parse_identifierPart();
          reportFailures--;
          if (result1 === null) {
            result1 = "";
          } else {
            result1 = null;
            pos = clone(pos1);
          }
          if (result1 !== null) {
            result0 = [result0, result1];
          } else {
            result0 = null;
            pos = clone(pos0);
          }
        } else {
          result0 = null;
          pos = clone(pos0);
        }
        return result0;
      }