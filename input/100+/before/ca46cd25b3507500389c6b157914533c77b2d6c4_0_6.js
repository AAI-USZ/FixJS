function registerEvent(module, name, event) {
  var chan = this, module = module, handler = event.op ? function checkOp() {
    var args = arguments[0];
    if (chan.isOperator(args[args.length - 1].prefix)) {
      console.log('Operator', args[1].green, 'dispatched event', name.green);
      event.handler.apply(module, arguments);
    } else {
      console.log('Non-Operator', args[1].red, 'tried dispatch event', name.red);
    }
  } : event.handler;

  if (chan.allowedEvents.indexOf(name) === -1) {
    console.log('Module tried to bind unsafe event:', name.red); return; }

  chan.network.on(name, function () {
    if (chan.isCore) {
      var net = arguments[0]; // If this is core channel the first argument is the network name.
      handler.call(module, arguments, function (out) {
        chan.network.say(net, chan.name, event.formatter(out));
      });
    } else {
      handler.call(module, arguments, function (out) {
        chan.network.say(chan.name, event.formatter(out));
      });
    }
  });
}