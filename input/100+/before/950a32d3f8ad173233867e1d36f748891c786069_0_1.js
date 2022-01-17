function(resolve, path, opt) {
                if (opt == null) {
                  opt = {};
                }
                _this.config = {
                  parent: _this.config,
                  exclude: opt.exclude || [],
                  excluded: opt.excluded || _this.isExcluded(path, _this.config)
                };
                return deps[path] = resolve(path);
              }