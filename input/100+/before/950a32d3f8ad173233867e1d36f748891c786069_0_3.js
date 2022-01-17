function() {

    function Boiler() {
      this.filenameIdMap = {};
      this.id = 0;
      this.everything = '';
    }

    Boiler.prototype.require = function(file) {
      this.config = {
        exclude: [],
        path: ''
      };
      this.hookExtensions();
      require(path_.resolve(file));
      return this.unhookExtensions();
    };

    Boiler.prototype.filenameToId = function(filename) {
      if (!(filename in this.filenameIdMap)) {
        this.filenameIdMap[filename] = this.id += 1;
      }
      return this.filenameIdMap[filename];
    };

    Boiler.prototype.isExcluded = function(path, config) {
      if (config.excluded || __indexOf.call(config.exclude, path) >= 0) {
        return true;
      } else if (config.parent) {
        return this.isExcluded(path, config.parent);
      } else {
        return false;
      }
    };

    Boiler.prototype._boil = function(id, pathIdMap, code, filename) {
      return "register.call(this," + id + "," + (JSON.stringify(pathIdMap)) + ",\nfunction(require,exports,module){\n// file: " + (path_.relative(__dirname, filename)) + "\n" + code + "\n});";
    };

    Boiler.prototype.serve = function() {
      return "(function(everything){\n  window.boiler={main:{}};\n  var idModuleMap={};\n  function emulateRequire(pathIdMap){\n    function require(path, opt){\n      var exports = idModuleMap[pathIdMap[path]];\n      if(typeof opt==='function'){\n        return opt(exports);\n      }else if(typeof opt==='string'){\n        return window[opt];\n      }else{\n        return exports;\n      }\n    }\n    return require;\n  }\n  function register(id,pathIdMap,factory){\n    var module={exports:{}};\n    factory.call(this,emulateRequire(pathIdMap),module.exports,module);\n    window.boiler.main=idModuleMap[id]=module.exports;\n  }\n  everything.call(this,register);\n}).call(this,function(register){\n" + this.everything + "\n});";
    };

    Boiler.prototype.unhookExtensions = function() {
      var ext, func, _ref, _results;
      _ref = require.extensions;
      _results = [];
      for (ext in _ref) {
        func = _ref[ext];
        if (func.__boiler_hook_orig != null) {
          _results.push(require.extensions[ext] = func.__boiler_hook_orig);
        }
      }
      return _results;
    };

    Boiler.prototype.hookExtensions = function() {
      var ext, func, _ref, _results,
        _this = this;
      _ref = require.extensions;
      _results = [];
      for (ext in _ref) {
        func = _ref[ext];
        if (!(func.__boiler_hook_orig != null)) {
          _results.push((function(ext, func) {
            var hook;
            hook = function(module, filename) {
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
            };
            hook.__boiler_hook_orig = func;
            return require.extensions[ext] = hook;
          })(ext, func));
        }
      }
      return _results;
    };

    return Boiler;

  }