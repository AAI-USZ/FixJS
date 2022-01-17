function checkOp(info, cb) {
    if (chan.isOperator(info.hostmask)) {
      console.log('Operator', info.from.green, 'called', name.green);
      handler.call(module.context, info, cb);
    } else { console.log('Non-Operator', info.from.red, 'tried to call', name.red); }
  }