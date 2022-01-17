function checkOp() {
    var args = arguments[0];
    if (chan.isOperator(args[args.length - 1].prefix)) {
      console.log('Operator', args[1].green, 'dispatched event', name.green);
      event.handler.apply(module, arguments);
    } else {
      console.log('Non-Operator', args[1].red, 'tried dispatch event', name.red);
    }
  }