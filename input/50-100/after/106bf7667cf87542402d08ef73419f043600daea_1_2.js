function(){
                                  ++S.in_function;
                                  var loop = S.in_loop;
                                  S.in_directives = true;
                                  S.in_loop = 0;
                                  var a = block_();
                                  --S.in_function;
                                  S.in_loop = loop;
                                  return a;
                          }