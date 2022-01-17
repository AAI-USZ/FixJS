function(context)
    {
        var panel = context.getPanel(panelName, true);
        var header = Dom.getElementByClass(panel.panelNode, "cookieHeaderRow");

        // Reset widths
        var columns = header.childNodes;
        for (var i=0; i<columns.length; i++)
        {
            var col = columns[i];
            if (col.style)
                col.style.width = "";
        }

        // Reset visibility.
        Options.clear(hiddenColsPref);
        panel.table.setAttribute("hiddenCols", Options.get(hiddenColsPref));
    }