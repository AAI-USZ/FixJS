function (from, message, raw) {
  var chan = this, commands = this.commands, routes = this.routes;

  function output (route, out) {
    try { chan.say(route.formatter(out)); }
    catch (err) {
      console.error('%s Module %s formatter failed!', 'ERROR'.red, route.module);
      console.log(err.stack);
    }
  }

  // Search for commands.
  for (var i in commands) { var cmd = commands[i];
    if (message.match(cmd.route)) {
      var quots = /".+?"/.exec(message)
        , temp = message.replace(/.+? /, '').replace(/".+?"/, '').replace(/^\s+|\s+$/g, '')
        , args = temp.split(" ")
        , current = cmd.args[args.length];
      if (quots) {for (var i = 0; i < quots.length; i++) {args.push(quots[i].replace(/"/g, ""));}}

      if (current && !current.default) {
        chan.say(util.format("You are missing %s: %s. See `%shelp %s`",
          cw('light_red', current.name), current.description, chan.config.commandPrefix, cmd.name));
        return;
      }

      cmd.handler.call(cmd.module,
        { from: from
        , message: message
        , hostmask: raw.prefix
        , args: args
        }, function (out) { output(cmd, out); }
      ); return;
    };
  }

  // It was not a command, let's see if we have routes for it.
  routes.forEach(function (r) {
    if (message.match(r.route)) {
      r.handler.call(r.module,
        { from: from
        , message: message
        , hostmask: raw.prefix
        , matches: message.match(r.route)
        }, function (out) { output(r, out); }
      );
    };
  });
}