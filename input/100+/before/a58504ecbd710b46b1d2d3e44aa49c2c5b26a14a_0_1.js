function (from, message, raw) {
  var chan = this, commands = this.commands, routes = this.routes;

  function handleRoute(r) {
    r.handler.call(r.module, {from: from, message: message, hostmask: raw.prefix}, function (out) {
      try { chan.say(r.formatter(out)); }
      catch (err) {
        console.error('%s Module %s formatter failed!', 'ERROR'.red, r.module);
        console.log(err.stack);
      }
    });
  }

  // Search for commands.
  for (var i in commands) { var r = commands[i];
    if (r.route.test(message)) { handleRoute(r); return; };
  }

  // It was not a command, let's see if we have routes for it.
  routes.forEach(function (r) {
    if (r.route.test(message)) { handleRoute(r); };
  });
}