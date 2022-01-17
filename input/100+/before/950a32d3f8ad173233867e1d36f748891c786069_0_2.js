function(module, filename) {
              var cmp, code, deps, fn, path, pathIdMap;
              code = '';
              deps = {};
              cmp = module._compile;
              module.__boiler_hook_in = function(resolve, path, opt) {
                if (opt == null) {
                  opt = {};
                }
                _this.config = {
                  parent: _this.config,
                  exclude: opt.exclude || [],
                  excluded: opt.excluded || _this.isExcluded(path, _this.config)
                };
                return deps[path] = resolve(path);
              };
              module.__boiler_hook_out = function() {
                if (_this.config.parent) {
                  return _this.config = _this.config.parent;
                }
              };
              module._compile = function(content, filename) {
                code = content;
                return cmp.call(this, "require = function(req) {\n  var require = function(path, opt) {\n    module.__boiler_hook_in(req.resolve, path, opt);\n    var res = req.call(this, path);\n    module.__boiler_hook_out();\n    return res;\n  };\n  for (var i in req) {\n    require[i] = req[i];\n  }\n  return require;\n}(require);\n" + content, filename);
              };
              try {
                func(module, filename);
              } catch (error) {

              }
              if (!_this.config.excluded) {
                pathIdMap = toDict((function() {
                  var _results1;
                  _results1 = [];
                  for (path in deps) {
                    fn = deps[path];
                    _results1.push([path, this.filenameToId(fn)]);
                  }
                  return _results1;
                }).call(_this));
                _this.everything += _this._boil(_this.filenameToId(filename), pathIdMap, code, filename);
              }
              return _this.hookExtensions();
            }