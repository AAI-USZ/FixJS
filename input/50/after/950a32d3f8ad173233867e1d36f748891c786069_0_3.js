function(content, filename) {
                code = content;
                return cmp.call(this, "require = function(req) {\n  var require = function(path, opt) {\n    var res;\n    module.__boiler_hook_in(req.resolve, path, opt);\n    try {\n      res = req.call(this, path);\n    } catch (err) {\n      module.__boiler_hook_error(err);\n    } finally {\n      module.__boiler_hook_out();\n    }\n    return res;\n  };\n  for (var i in req) {\n    require[i] = req[i];\n  }\n  return require;\n}(require);\n" + content, filename);
              }