function(event)
    {
        var checkBox = event.target;
        if (!Css.hasClass(checkBox, "breakpointCheckbox"))
            return;

        var bpPanel = Firebug.getElementPanel(event.target);
        var context = bpPanel.context;

        var bp = Dom.getAncestorByClass(checkBox, "breakpointRow").repObject;
        bp.checked = checkBox.checked;

        var panel = context.getPanel(panelName, true);
        if (!panel)
            return;

        // xxxsz: Needs a better way to update display of breakpoint than invalidate
        // the whole panel's display
        // xxxHonza
        panel.context.invalidatePanels("breakpoints");

        panel.enumerateRequests(function(file)
        {
            if (file.getFileURL() == bp.href)
                file.row.setAttribute("disabledBreakpoint", bp.checked ? "false" : "true");
        });
    }