function(context)
    {
        var panel = context.getPanel(panelName, true);
        var header = panel.panelNode.getElementsByClassName("netHeaderRow").item(0);

        // Reset widths
        var columns = header.childNodes;
        for (var i=0; i<columns.length; i++)
        {
            var col = columns[i];
            if (col.style)
                col.style.width = "";
        }

        // Reset visibility. Only the Status column is hidden by default.
        Options.clear(hiddenColsPref);
        panel.table.setAttribute("hiddenCols", Options.get(hiddenColsPref));
    }