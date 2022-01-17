function(panel, armed)
    {
        if (!panel)
            return;

        // If the script panels is disabled, BON can't be active.
        if (!Firebug.PanelActivation.isPanelEnabled("script"))
            armed = false;

        var panelBar = Firebug.chrome.$("fbPanelBar1");
        var tab = panelBar.getTab(panel.name);
        if (tab)
            tab.setAttribute("breakOnNextArmed", armed ? "true" : "false");
    }