function(value) {
      if (value) {
        return group.events.listen(cmd.getCommandEditor(), 'blur', firebug.run, true);
      } else if (!value) {
        return group.events.unlisten(cmd.getCommandEditor(), 'blur', firebug.run, true);
      }
    }