function() {
      var allArgs, args, argsLen, callback, cmd, opts, ps;
      allArgs = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      argsLen = allArgs.length;
      cmd = allArgs[0];
      args = allArgs[1];
      opts = argsLen === 4 ? allArgs[2] : {};
      callback = argsLen > 2 ? allArgs[argsLen - 1] : null;
      console.log(cmd, args, opts, callback);
      Utils.print([cmd, args.join(" ")].join(" "));
      ps = child_proc.spawn(cmd, args, opts);
      ps.stdout.pipe(process.stdout);
      ps.stderr.pipe(process.stderr);
      if (callback) {
        return ps.on("exit", callback);
      }
    }