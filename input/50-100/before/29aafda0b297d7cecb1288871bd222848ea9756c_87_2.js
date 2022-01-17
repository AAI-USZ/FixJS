function(event)
    {
        Events.cancelEvent(event);

        var bpPanel = Firebug.getElementPanel(event.target);
        var context = bpPanel.context;

        if (Css.hasClass(event.target, "closeButton"))
        {
            // Remove from list of breakpoints.
            var row = Dom.getAncestorByClass(event.target, "breakpointRow");
            context.mutationBreakpoints.removeBreakpoint(row.repObject);

            bpPanel.refresh();
        }
    }