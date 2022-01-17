function registerRoute(module, name, route) {
  var chan = this, checkOp = function checkOp(info, cb) {
    if (chan.isOperator(info.hostmask)) {
      console.log('Operator', info.from.green, 'activated route', name.green);
      command.handler.call(module, info, cb);
    } else { console.log('Non-Operator', info.from.red, 'tried to activate route', name.red); }
  };

  chan.routes.push({ route: route.route, module: module, help: route.help, name: name,
    handler: route.op ? checkOp : route.handler, formatter: route.formatter });
}