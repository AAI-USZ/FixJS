function() {
                  var _results1;
                  _results1 = [];
                  for (path in deps) {
                    fn = deps[path];
                    _results1.push([path, this.filenameToId(fn)]);
                  }
                  return _results1;
                }