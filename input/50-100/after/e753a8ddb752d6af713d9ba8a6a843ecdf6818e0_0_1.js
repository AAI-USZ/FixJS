function (array, callback) {
      // An array of args.
      // Assume we only have two args.
      if (Array.isArray(array)) {
        return this.sendCommand(command, array, callback);
      }

      // Arbitary amount of arguments.
      callback = typeof arguments[arguments.length - 1] === 'function';
      args     = utils.toArray(arguments);

      if (true === callback) {
        callback = args.pop();
      } else {
        callback = null;
      }

      return this.sendCommand(command, args, callback);
    }