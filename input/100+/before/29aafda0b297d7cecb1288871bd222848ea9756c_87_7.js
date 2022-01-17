function(event)
    {
        var checkBox = event.target;
        if (!Css.hasClass(checkBox, "breakpointCheckbox"))
            return;

        var bpPanel = Firebug.getElementPanel(event.target);
        var context = bpPanel.context;

        var panel = context.getPanel("html", true);
        if (panel)
        {
            // xxxsz: Needs a better way to update display of breakpoint than invalidate
            // the whole panel's display
            panel.context.invalidatePanels("breakpoints");
        }

        var bp = Dom.getAncestorByClass(checkBox, "breakpointRow").repObject;
        bp.checked = checkBox.checked;
    }