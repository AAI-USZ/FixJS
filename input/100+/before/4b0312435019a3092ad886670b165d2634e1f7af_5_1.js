function() {
      var args, c, cb, cmd, command, k, list, listContext, output, _i;
      command = arguments[0], args = 3 <= arguments.length ? __slice.call(arguments, 1, _i = arguments.length - 1) : (_i = 1, []), cb = arguments[_i++];
      if (typeof cb !== 'function') {
        args.push(cb);
      }
      if ((command != null) && typeof command === 'string') {
        cmd = commands[command];
        if (cmd == null) {
          return puts(missing("Command " + command)) && (typeof cb === "function" ? cb() : void 0);
        }
      } else {
        list = {};
        for (k in commands) {
          c = commands[k];
          list[c.aliases.join(", ")] = c;
        }
        listContext = {
          list: list,
          title: "Commands:"
        };
        cmd = {
          usages: ['neat [command] [args]...'],
          description: renderSync(resolve(__dirname, "help/_neat")).yellow,
          help: renderSync(resolve(__dirname, "help/_list"), listContext)
        };
      }
      output = function(err, res) {
        return puts(res) && (typeof cb === "function" ? cb() : void 0);
      };
      if (typeof cmd.help === 'function') {
        return render(__filename, cmd.help.apply(null, args), output);
      } else {
        return render(__filename, cmd, output);
      }
    }