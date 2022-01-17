function(panel)
    {
        var breakable = Firebug.chrome.getGlobalAttribute("cmd_firebug_toggleBreakOn", "breakable");

        // Get proper tooltip for the break-on-next button from the current panel.
        // If breakable is set to "false" the feature is already activated (throbbing).
        var armed = (breakable == "false");
        var tooltip = panel.getBreakOnNextTooltip(armed);
        if (!tooltip)
            tooltip = "";

        // The user should know that BON is disabled if the Script panel (debugger) is disabled.
        if (breakable == "disabled")
            tooltip += " " + Locale.$STR("firebug.bon.scriptPanelNeeded");

        Firebug.chrome.setGlobalAttribute("cmd_firebug_toggleBreakOn", "tooltiptext", tooltip);
    }