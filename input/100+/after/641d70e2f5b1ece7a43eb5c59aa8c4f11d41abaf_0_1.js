function() {
            if (!debug.watchers[this.$id]) {
              debug.watchers[this.$id] = [];
            }
            var str = watchFnToHumanReadableString(arguments[0]);

            debug.watchers[this.$id].push(str);
            
            
            var w = arguments[0];
            if (typeof w === 'function') {
              arguments[0] = function () {
                var start = window.performance.webkitNow();
                var ret = w.apply(this, arguments);
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
              };
            } else {
              var thatScope = this;
              arguments[0] = function () {
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
              };
            }

            var fn = arguments[1];
            arguments[1] = function () {
              var start = window.performance.webkitNow();
              var ret = fn.apply(this, arguments);
              var end = window.performance.webkitNow();
              var str = fn.toString();
              if (typeof debug.watchList[str] !== 'number') {
                debug.watchList[str] = 0;
                //debug.watchList[str].total = 0;
              }
              debug.watchList[str] += (end - start);
              //debug.watchList[str].total += (end - start);
              //debug.dirty = true;
              return ret;
            };

            return watch.apply(this, arguments);
          }