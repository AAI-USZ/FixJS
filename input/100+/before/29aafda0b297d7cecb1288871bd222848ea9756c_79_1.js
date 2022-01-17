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
        context.dom.breakpoints.removeBreakpoint(bp.object, bp.propName);

        bpPanel.refresh();

        var domPanel = context.getPanel("dom", true);
        if (domPanel)
        {
            var domRow = findRow(domPanel.panelNode, bp.object, bp.propName);
            if (domRow)
            {
                domRow.removeAttribute("breakpoint");
                domRow.removeAttribute("disabledBreakpoint");
            }
        }
    }