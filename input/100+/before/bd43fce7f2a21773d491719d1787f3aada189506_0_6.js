function registerCommand(module, name, command) {
  var chan = this;

  function checkOp(info, cb) {
    if (chan.isOperator(info.hostmask)) {
      console.log('Operator', info.from.green, 'called', name.green);
      command.handler.call(module, info, cb);
    } else {
      console.log('Non-Operator', info.from.red, 'tried to call', name.red);
    }
  }

  chan.commands.push({
        route: new RegExp('^' + chan.config.commandPrefix + name + '( |$)', 'i'),
       module: module,
      handler: command.op ? checkOp : command.handler,
    formatter: command.formatter,
         help: command.help
  });
}