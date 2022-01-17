function(context)
    {
        if (Firebug.Breakpoint && Firebug.Breakpoint.updatePanelTab)
        {
            var panel = context.getPanel(panelName, true);
            Firebug.Breakpoint.updatePanelTab(panel, false);
            Firebug.Breakpoint.breakNow(context.getPanel(panelName, true));
        }
    }