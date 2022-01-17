function(context, colId)
    {
        var panel = context.getPanel(panelName, true);
        var table = panel.table;
        var hiddenCols = table.getAttribute("hiddenCols");

        // If the column is already present in the list of hidden columns,
        // remove it, otherwise append it.
        var index = hiddenCols.indexOf(colId);
        if (index >= 0)
        {
            table.setAttribute("hiddenCols", hiddenCols.substr(0,index-1) +
                hiddenCols.substr(index+colId.length));
        }
        else
        {
            table.setAttribute("hiddenCols", hiddenCols + " " + colId);
        }

        // Store current state into the preferences.
        Options.set("net.hiddenColumns", table.getAttribute("hiddenCols"));

        panel.updateHRefLabelWidth();
    }