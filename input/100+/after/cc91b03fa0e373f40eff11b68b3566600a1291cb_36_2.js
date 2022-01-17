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

        var domPanel = context.getPanel("dom", true);
        if (domPanel)
        {
            var row = findRow(domPanel.panelNode, bp.object, bp.propName);
            if (row)
                row.setAttribute("disabledBreakpoint", bp.checked ? "false" : "true");
        }
    }