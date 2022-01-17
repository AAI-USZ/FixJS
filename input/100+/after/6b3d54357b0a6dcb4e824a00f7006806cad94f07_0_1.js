function(command, opts, next) {
      var cwd, nodePath, npmPath, output, partTwo, _ref;
      _ref = balUtilFlow.extractOptsAndCallback(opts, next), opts = _ref[0], next = _ref[1];
      nodePath = opts.nodePath, npmPath = opts.npmPath, cwd = opts.cwd, output = opts.output;
      npmPath || (npmPath = 'npm');
      if (balUtilTypes.isString(command)) {
        command = command.split(' ');
      } else if (!balUtilTypes.isArray(command)) {
        return next(new Error('unknown command type'));
      }
      partTwo = function() {
        return balUtilModules.spawn(command, {
          cwd: cwd,
          output: output
        }, next);
      };
      command.unshift(npmPath);
      if (nodePath) {
        balUtilPaths.exists(npmPath, function(exists) {
          if (exists) {
            command.unshift(nodePath);
          }
          return partTwo();
        });
      } else {
        partTwo();
      }
      return this;
    }