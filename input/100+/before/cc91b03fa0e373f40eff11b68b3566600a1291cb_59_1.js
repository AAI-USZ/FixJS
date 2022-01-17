function(event)
    {
        Events.cancelEvent(event);

        if (!Css.hasClass(event.target, "closeButton"))
            return;

        var bpPanel = Firebug.getElementPanel(event.target);
        var context = bpPanel.context;

        // Remove from list of breakpoints.
        var row = Dom.getAncestorByClass(event.target, "breakpointRow");
        var bp = row.repObject;
        context.netProgress.breakpoints.removeBreakpoint(bp.href);

        bpPanel.refresh();

        var panel = context.getPanel(panelName, true);
        if (!panel)
            return;

        panel.enumerateRequests(function(file)
        {
            if (file.getFileURL() == bp.href)
            {
                file.row.removeAttribute("breakpoint");
                file.row.removeAttribute("disabledBreakpoint");
            }
        })
    }