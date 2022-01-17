function(module_, filename) {
        var cmp, msg;
        cmp = module_._compile;
        module_.__boiler_hook_in = function() {
          var args;
          args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
          return Boiler.inHook.apply(Boiler, [pot].concat(__slice.call(args)));
        };
        module_.__boiler_hook_error = function() {
          var args;
          args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
          return Boiler.errorHook.apply(Boiler, [pot].concat(__slice.call(args)));
        };
        module_.__boiler_hook_out = function() {
          var args;
          args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
          return Boiler.outHook.apply(Boiler, [pot].concat(__slice.call(args)));
        };
        module_._compile = function(content, filename) {
          var code, nodeCode, res;
          debug(module_.filename);
          if (path_.basename(module_.filename, '.js') === 'boiler') {
            code = nodeCode = pot.config.code = module.exports.__boiler_code;
          } else {
            code = pot.config.code = Boiler.injectExportWrap(pot, content);
            debug("adding fake require to " + filename);
            nodeCode = Boiler.requireWrap(code);
          }
          res = cmp.call(this, nodeCode, filename);
          return res;
        };
        try {
          func(module_, filename);
        } catch (err) {
          msg = err.toString();
          if (msg.indexOf('Error: Cannot find module') === 0) {
            console.warn(msg, 'in file:', filename);
          }
          debug("Boiler error when running wrapped code:", err.stack);
        }
        return Boiler.hookExtensions(pot);
      }