function(context)
    {
        var commandLine = this.getCommandLine(context);
        context.commandLineText = commandLine.getCommands();
        if(FBTrace.DBG_COMMANDLINE)
            FBTrace.sysout("commandLine.update; commandLineText: "+context.commandLineText);
    }