function(context, event)
    {
        // Avoid bubbling from associated options.
        if (event.target.id != "cmd_firebug_toggleBreakOn")
            return;

        if (!context)
        {
            if (FBTrace.DBG_BP)
                FBTrace.sysout("Firebug chrome: breakOnNext with no context??");
            return;
        }

        var panel = panelBar1.selectedPanel;

        if (FBTrace.DBG_BP)
            FBTrace.sysout("Firebug chrome: breakOnNext for panel " +
                (panel ? panel.name : "NO panel"), panel);

        if (panel && panel.breakable)
            Firebug.Breakpoint.toggleBreakOnNext(panel);
    }