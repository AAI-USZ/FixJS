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

        var bpPanel = Firebug.getElementPanel(event.target);
        var context = bpPanel.context;

        var panel = context.getPanel(panelName, true);
        if (!panel)
            return;

        panel.enumerateRequests(function(file)
        {
            if (file.getFileURL() == bp.href)
                file.row.setAttribute("disabledBreakpoint", bp.checked ? "false" : "true");
        });
    }