function(value)
    {
        var panelPane = FirebugChrome.$("fbPanelPane");
        if (!panelPane)
            return;

        var newOrient = value ? "vertical" : "horizontal";
        if (panelPane.orient == newOrient)
            return;

        panelSplitter.orient = panelPane.orient = newOrient;
    }