function (array, callback) {
      // An array of args.
      // Assume we only have two args.
      if (Array.isArray(array)) {
        return this.sendCommand(command, array, callback);
      }

      // Arbitary amount of arguments.
      var args    = [];
      args.push.apply(args, arguments);
      callback    = 'function' === typeof args[args.length - 1];

      if (callback) {
        callback  = args.pop();
      } else {
        callback  = null;
      }

      this.sendCommand(command, args, callback);
    }