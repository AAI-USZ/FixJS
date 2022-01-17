function(event)
    {
        var checkBox = event.target;
        if (!Css.hasClass(checkBox, "breakpointCheckbox"))
            return;

        var bp = Dom.getAncestorByClass(checkBox, "breakpointRow").repObject;
        bp.checked = checkBox.checked;

        var bpPanel = Firebug.getElementPanel(checkBox);
        var cookiePanel = bpPanel.context.getPanel(panelName, true);
        if (!cookiePanel)
            return;

        var cookie = cookiePanel.findRepObject(bp);
        if (cookie)
            cookie.row.setAttribute("disabledBreakpoint", bp.checked ? "false" : "true");
    }