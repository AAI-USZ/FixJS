function(resolve, path, opt) {
                if (opt == null) {
                  opt = {};
                }
                _this.debug("hook into " + path + ":" + filename);
                _this.config = {
                  parent: _this.config,
                  exclude: opt.exclude || [],
                  excluded: opt.excluded || _this.isExcluded(path, _this.config),
                  head: opt.head || '',
                  foot: opt.foot || '',
                  path: path
                };
                deps[path] = resolve(path);
                return _this.debug(_this.config);
              }