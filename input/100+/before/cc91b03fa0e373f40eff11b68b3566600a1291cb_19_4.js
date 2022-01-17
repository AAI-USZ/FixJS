function(event)
    {
        Events.cancelEvent(event);

        var bpPanel = Firebug.getElementPanel(event.target);
        var context = bpPanel.context;

        if (!Css.hasClass(event.target, "closeButton"))
            return;

        // Remove from list of breakpoints.
        var row = Dom.getAncestorByClass(event.target, "breakpointRow");
        context.cookies.breakpoints.removeBreakpoint(row.repObject);

        // Remove from the UI.
        bpPanel.noRefresh = true;
        bpPanel.removeRow(row);
        bpPanel.noRefresh = false;

        var cookiePanel = context.getPanel(panelName, true);
        if (!cookiePanel)
            return;

        var cookie = cookiePanel.findRepObject(row.repObject);
        if (cookie)
        {
            cookie.row.removeAttribute("breakpoint");
            cookie.row.removeAttribute("disabledBreakpoint");
        }
    }