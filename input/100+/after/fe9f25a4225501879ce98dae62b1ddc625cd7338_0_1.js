function initBuiltins(chan) {

  ///////////////////////////////////////////////////////////////////// HELP //
  ////////////////////////////////////////////////////////////////////////////
  function getHelp(command) {
    if (command === 'commands') {
      return 'Modules loaded: '
        + Object.keys(chan.modules).map(function (name) { return name; }).join(', ')
        + '\nAvailable commands: '
        + chan.commands.map(function (cmd) { return cmd.name; }).join(', ');
    } else if (command[0] === '#') {
      var module = require(chan.modulePath + command.substring(1) + '/module');
      if (!module) { return "Could not find module."; }
      var contact = module.contact ? '\nContact: ' + module.contact : '';
      return format("%s (%s) by %s %s.%s",
        module.name, module.version, module.author, module.description, contact);
    } else {
      for (var i = chan.commands.length - 1; i >= 0; i--) {
        var cmd = chan.commands[i], args = cmd.args || [];
        if (cmd.name !== command) { continue; }
        return cmd.help + '\n'
         + args.map(function (arg) {
            return arg.default ?
              format('  [%s="%s"] - %s\n', cw('gray', arg.name), arg.default, arg.description):
              format('  %s - %s\n', cw('gray', arg.name), arg.description) }).join('\n');
      } return 'No help found. See http://git.io/tuhbot for wiki.';
    }
  };

  chan.registerCommand({}, 'help', {
    help: 'Shows help about commands. Optional parameters are displayed in square brackets. '
        + 'Use "#" to get information about modules.',
    args: [{name: 'command'
          , description: 'Command you want to know more about', default: 'commands'}],
    handler: function (i, o) { o(i.args[0]); },
    formatter: getHelp
  });
}