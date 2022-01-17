function(context, colId)
    {
        var table = context.getPanel(panelName, true).table;
        var hiddenCols = table.getAttribute("hiddenCols");

        // If the column is already presented in the list of hidden columns,
        // remove it, otherwise append.
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
        Option.set(hiddenColsPref, table.getAttribute("hiddenCols"));
    }