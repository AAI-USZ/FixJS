function checkOp(info, cb) {
    if (chan.isOperator(info.hostmask)) {
      console.log('Operator', info.from.green, 'activated route', name.green);
      command.handler.call(module, info, cb);
    } else { console.log('Non-Operator', info.from.red, 'tried to activate route', name.red); }
  }