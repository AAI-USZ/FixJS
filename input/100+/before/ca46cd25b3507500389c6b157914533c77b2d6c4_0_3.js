function (message) {
  var chan = this, cmd, output = function output (route, out) {
    try { message.reply(route.formatter(out)); }
    catch (err) { console.error('%s Module %s formatter failed!\n%s',
      'ERROR'.red, route.name, err.stack); }
  }

  for (var i in chan.commands) { cmd = chan.commands[i];
    if (message.text.match(cmd.route)) {
        // Parse arguments `!help lol "hello world: "` -> ['lol', 'hello world: ']
        var allArgs, args = (message.text.match(/([^\s]*"[^"]+"[^\s]*)|([^ ]+)/g) || [])
          .splice(1).map(function (s) { return s.replace(/^"(.+?)"$/, '$1') })
        , current = cmd.args && cmd.args[args.length];

      if (current && !current.default) { // Missing an argument that doesn't have a default.
        message.reply(util.format("You are missing %s: %s. See `%shelp %s`", cw('light_red',
          current.name), current.description, chan.config.commandPrefix, cmd.name));
      } else {
        allArgs = cmd.args.map(function (a, i) { return args[i] || a.default; });
        cmd.handler.call(cmd.module,
          { from: message.from, message: message.text, net: message.net
          , hostmask: message.raw.prefix, args: allArgs },
          function (out) { output(cmd, out); });
      } return; // Command executed, nothing to do.
    };
  }

  chan.routes.forEach(function (r) {
    if (message.text.match(r.route)) {
      r.handler.call(r.module,
        { from: message.from, message: message.text
        , hostmask: message.raw.prefix, matches: message.text.match(r.route) },
        function (out) { output(r, out); });
    };
  });
}