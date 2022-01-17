function()
    {
        if (!Firebug.currentContext)
            return false;

        // TODO this should be a panel listener operation.

        // The profiler is available only if the Script panel and Console are enabled
        var scriptPanel = Firebug.currentContext.getPanel("script", true);
        var consolePanel = Firebug.currentContext.getPanel("console", true);
        var disabled = (scriptPanel && !scriptPanel.isEnabled()) ||
            (consolePanel && !consolePanel.isEnabled());

        if (!disabled)
        {
            // The profiler is available only if the Debugger and Console are activated
            var debuggerTool = Firebug.connection.getTool("script");
            var consoleTool = Firebug.connection.getTool("console");
            disabled = (debuggerTool && !debuggerTool.getActive()) ||
                (consoleTool && !consoleTool.getActive());
        }

        // Attributes must be modified on the <command> element. All toolbar buttons
        // and menuitems are hooked up to the command.
        Firebug.chrome.setGlobalAttribute("cmd_toggleProfiling", "disabled",
            disabled ? "true" : "false");

        // Update button's tooltip.
        var tooltipText = disabled ? Locale.$STR("ProfileButton.Disabled.Tooltip")
            : Locale.$STR("ProfileButton.Enabled.Tooltip");
        Firebug.chrome.setGlobalAttribute("cmd_toggleProfiling", "tooltiptext", tooltipText);
    }