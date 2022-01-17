function(command, opts, next) {
      var cwd, nodePath, npmPath, output, _ref;
      _ref = balUtilFlow.extractOptsAndCallback(opts, next), opts = _ref[0], next = _ref[1];
      nodePath = opts.nodePath, npmPath = opts.npmPath, cwd = opts.cwd, output = opts.output;
      npmPath || (npmPath = 'npm');
      if (balUtilTypes.isString(command)) {
        command = command.split(' ');
      } else if (!balUtilTypes.isArray(command)) {
        return next(new Error('unknown command type'));
      }
      command.unshift(npmPath);
      if (nodePath) {
        command.unshift(nodePath);
      }
      return balUtilModules.spawn(command, {
        cwd: cwd,
        output: output
      }, next);
    }