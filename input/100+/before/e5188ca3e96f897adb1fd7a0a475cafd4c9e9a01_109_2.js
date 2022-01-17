function(event)
    {
        var checkBox = event.target;
        if (!Css.hasClass(checkBox, "breakpointCheckbox"))
            return;

        var bpPanel = Firebug.getElementPanel(event.target);
        var context = bpPanel.context;

        var bp = Dom.getAncestorByClass(checkBox, "breakpointRow").repObject;
        bp.checked = checkBox.checked;

        var domPanel = context.getPanel("dom", true);
        if (domPanel)
        {
            // xxxsz: Needs a better way to update display of breakpoint than
            // invalidate the whole panel's display
            domPanel.context.invalidatePanels("breakpoints");

            var row = findRow(domPanel.panelNode, bp.object, bp.propName);
            if (row)
                row.setAttribute("disabledBreakpoint", bp.checked ? "false" : "true");
        }
    }