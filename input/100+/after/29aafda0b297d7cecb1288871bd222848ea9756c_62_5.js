function(event)
    {
        var checkBox = event.target;
        var bpRow = Dom.getAncestorByClass(checkBox, "breakpointRow");

        if (checkBox.checked)
        {
            Css.removeClass(bpRow, "disabled");
            bpRow.setAttribute("aria-checked", "true");
        }
        else
        {
            Css.setClass(bpRow, "disabled");
            bpRow.setAttribute("aria-checked", "false");
        }

        var bp = bpRow.repObject;
        bp.checked = checkBox.checked;

        var bpPanel = Firebug.getElementPanel(checkBox);

        var cookiePanel = bpPanel.context.getPanel(panelName, true);
        if (!cookiePanel)
            return;

        var cookie = cookiePanel.findRepObject(bp);
        if (cookie)
            cookie.row.setAttribute("disabledBreakpoint", bp.checked ? "false" : "true");
    }