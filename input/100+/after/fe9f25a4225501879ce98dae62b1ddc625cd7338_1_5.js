function (message) {
  var chan = this, cmd;

  message.hostmask = message.raw.prefix;

  function handle(route, data) {
    var context = route.module.context;

    function format(out) {
      try { message.reply(route.formatter.call(context, out)); }
      catch (e) {
        console.error('%s Module %s formatter failed!', 'ERROR'.red, route.name);
        chan.log.exception(e, 'Module ' + route.name + ' formatter failed');
      }
    }

    try { route.handler.call(context, data, format); }
    catch (e) {
       console.error('%s Module %s handler failed!', 'ERROR'.red, route.name);
       chan.log.exception(e, 'Module ' + route.name + ' handler failed');
    }
  }

  for (var i in chan.commands) { cmd = chan.commands[i];
    if (message.text.match(cmd.route)) {
        cmd.args = cmd.args || [];
        // Parse arguments `!help lol "hello world: "` -> ['lol', 'hello world: ']
        var args = (message.text.match(/([^\s]*"[^"]+"[^\s]*)|([^ ]+)/g) || [])
          .splice(1).map(function (s) { return s.replace(/^"(.+?)"$/, '$1') })
        , current = cmd.args[args.length];

      if (current && !current.default) { // Missing an argument that doesn't have a default.
        message.reply(util.format("You are missing %s: %s. See `%shelp %s`", cw('light_red',
          current.name), current.description, chan.config.commandPrefix, cmd.name));
      } else {
        // Insert default values if needed.
        message.args = cmd.args.map(function (a, i) { return args[i] || a.default; })
          .concat(args.slice(cmd.args.length));

        handle(cmd, message);
      }
      return; // Command executed, nothing else to do here.
    };
  }

  chan.routes.forEach(function (r) {
    if (message.text.match(r.route)) {
      message.matches = message.text.match(r.route);
      handle(r, message);
    };
  });
}