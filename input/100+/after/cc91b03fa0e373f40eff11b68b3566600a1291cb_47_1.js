function(panel)
    {
        var breakable = Firebug.chrome.getGlobalAttribute("cmd_firebug_toggleBreakOn", "breakable");

        if (FBTrace.DBG_BP)
            FBTrace.sysout("breakpoint.toggleBreakOnNext; currentBreakable "+breakable+
                " in " + panel.context.getName());

        // Toggle button's state.
        breakable = (breakable == "true" ? "false" : "true");
        Firebug.chrome.setGlobalAttribute("cmd_firebug_toggleBreakOn", "breakable", breakable);

        // Call the current panel's logic related to break-on-next.
        // If breakable == "true" the feature is currently disabled.
        var enabled = (breakable == "true" ? false : true);
        panel.breakOnNext(enabled);

        // Make sure the correct tooltip (coming from the current panel) is used.
        this.updateBreakOnNextTooltips(panel);

        // Light up the tab whenever break on next is selected
        this.updatePanelTab(panel, enabled);

        return enabled;
    }