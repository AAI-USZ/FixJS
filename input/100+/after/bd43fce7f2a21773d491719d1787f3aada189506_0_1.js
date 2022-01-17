function() {
  var chan = this;

  function getHelp (command) {
    if (!command) {
      return 'Modules loaded: '
        + Object.keys(chan.modules).map(function (name) { return name; }).join(', ')
        + '\nAvailable commands: '
        + chan.commands.map(function (cmd) { return cmd.name; }).join(', ');
    } else if (command[0] === '#') {
      var module = require(chan.modulePath + command.substring(1) + '/module');
      if (!module) { return "Could not find module."; }
      var contact = module.contact ? '\nContact: ' + module.contact : '';
      return util.format("%s Made by %s%s",
        module.description, module.author, contact);
    } else {
      for (var i = chan.commands.length - 1; i >= 0; i--) {
        var cmd = chan.commands[i];
        if (cmd.name !== command) { continue; }
        return cmd.help + '\n'
         + cmd.args.map(function (arg) {
            return arg.default ?
              util.format('  [%s="%s"] - %s\n', cw('gray', arg.name), arg.default, arg.description):
              util.format('  %s - %s\n', cw('gray', arg.name), arg.description)
           });
      };
    }
  }

  var help_command = {
           op: false,
         help: 'Shows help about commands. Optional parameters are displayed in square brackets. '
             + 'Use `!help #module` to get information about modules.',
         args: [{name: 'command', description: 'Command you want to know more about', default: 'commands'}],
      handler: function (i, o) { o(i.args[0]); },
    formatter: getHelp
  };

  chan.registerCommand({}, 'help', help_command);
}