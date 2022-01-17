function(state)
    {
        if (FBTrace.DBG_CONSOLE)
            FBTrace.sysout("Console.panel show; wasScrolledToBottom: " +
                (state ? state.wasScrolledToBottom : "no prev state") +
                " " + this.context.getName(), state);

        this.showCommandLine(true);
        this.showToolbarButtons("fbConsoleButtons", true);

        this.setFilter(Firebug.consoleFilterTypes);

        Firebug.chrome.setGlobalAttribute("cmd_firebug_togglePersistConsole", "checked",
            this.persistContent);

        this.showPanel(state);
    }