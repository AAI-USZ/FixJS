function () {
                          var start = window.performance.webkitNow();
                          var ret = thatScope.$eval(w);
                          var end = window.performance.webkitNow();
                          if (!debug.watchExp[str]) {
                            debug.watchExp[str] = {
                              time: 0,
                              calls: 0
                            };
                          }
                          debug.watchExp[str].time += (end - start);
                          debug.watchExp[str].calls += 1;
                          return ret;
                        }