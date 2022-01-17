function(value)
    {
        var panelPane = FirebugChrome.$("fbPanelPane");
        var newOrient = value ? "vertical" : "horizontal";
        if (panelPane.orient == newOrient)
            return;

        panelSplitter.orient = panelPane.orient = newOrient;
    }