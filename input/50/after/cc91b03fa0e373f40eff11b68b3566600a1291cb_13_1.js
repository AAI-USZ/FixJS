function(context)
    {
        var panel = context.getPanel("console");
        panel.persistContent = panel.persistContent ? false : true;

        Firebug.chrome.setGlobalAttribute("cmd_firebug_togglePersistConsole", "checked",
            panel.persistContent);
    }