function(browser, panel)
    {
        if (!panel)  // there is no selectedPanel?
            return;

        var breakButton = Firebug.chrome.$("fbBreakOnNextButton");
        if (panel.name)
            breakButton.setAttribute("panelName", panel.name);

        breakButton.removeAttribute("type");
        Dom.collapse(Firebug.chrome.$("fbBonButtons"), !panel.breakable);

        // The script panel can be created at this moment (the second parameter is false)
        // It's needed for break on next to work (do not wait till the user actuall
        // selectes the panel).
        var scriptPanel = panel.context.getPanel("script");
        var scriptEnabled = scriptPanel && scriptPanel.isEnabled();
        var tool = Firebug.connection.getTool("script");
        var scriptActive = tool && tool.getActive();
        var supported = panel.supportsBreakOnNext();

        // Enable by default and disable if needed.
        Firebug.chrome.setGlobalAttribute("cmd_toggleBreakOn", "disabled", null);

        // Disable BON if script is disabled or if BON isn't supported by the current panel.
        if (!scriptEnabled || !scriptActive || !supported)
        {
            Firebug.chrome.setGlobalAttribute("cmd_toggleBreakOn", "breakable", "disabled");
            Firebug.chrome.setGlobalAttribute("cmd_toggleBreakOn", "disabled", "true");
            this.updateBreakOnNextTooltips(panel);
            return;
        }

        // Set the tooltips and update break-on-next button's state.
        var shouldBreak = panel.shouldBreakOnNext();
        this.updateBreakOnNextState(panel, shouldBreak);
        this.updateBreakOnNextTooltips(panel);
        this.updatePanelTab(panel, shouldBreak);

        var menuItems = panel.getBreakOnMenuItems();
        if (!menuItems || !menuItems.length)
            return;

        breakButton.setAttribute("type", "menu-button");

        var menuPopup = Firebug.chrome.$("fbBreakOnNextOptions");
        Dom.eraseNode(menuPopup);

        for (var i=0; i<menuItems.length; ++i)
            Menu.createMenuItem(menuPopup, menuItems[i]);
    }