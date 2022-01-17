function(panel, armed)
    {
        // If the panel should break at the next chance, set the button to not breakable,
        // which means already active (throbbing).
        var breakable = armed ? "false" : "true";
        Firebug.chrome.setGlobalAttribute("cmd_firebug_toggleBreakOn", "breakable", breakable);
    }