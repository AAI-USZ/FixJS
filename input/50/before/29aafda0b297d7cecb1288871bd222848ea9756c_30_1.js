function(context)
    {
        var panel = context.getPanel(panelName);
        panel.persistContent = panel.persistContent ? false : true;
        Firebug.chrome.setGlobalAttribute("cmd_togglePersistNet", "checked", panel.persistContent);
    }