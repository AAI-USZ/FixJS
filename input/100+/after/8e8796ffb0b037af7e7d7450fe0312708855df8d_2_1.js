function handleEnterKey(e) {
    var key = getKey(e)
    var string = CmdBox.get().content

    var commandNames = getFilteredCommands(string)

    if (isAcceptKey(key) || (commandNames.length === 1 && commands[commandNames[0]].hasArgs !== true)) {
      Dialog.stop(true)
      if (commandNames.length > 1) {
        commandNames = [commandNames[0]]
      }

      var cmdname = commandNames[0]
      var cmd = commands[cmdname]
      var fn = cmd.func
      var args = ''
      if (cmd.hasArgs) {
        args = string.substring(string.indexOf(' ')).trim()
      }
      if (CmdLineMode) {
        try {
          fn.call('', args)

        } catch (err) {
          logError(err)
        }
        CmdLineMode = false;
      }

      return true;
    }

    return false;
  }