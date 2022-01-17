function(object, panelName, sidePanelName, forceUpdate)
    {
        if (FBTrace.DBG_PANELS)
            FBTrace.sysout("chrome.select object:"+object+" panelName:"+panelName+
                " sidePanelName:"+sidePanelName+" forceUpdate:"+forceUpdate+"\n");

        var bestPanelName = getBestPanelName(object, Firebug.currentContext, panelName);

        // Allow refresh if needed (the last argument).
        var panel = this.selectPanel(bestPanelName, sidePanelName/*, true*/);
        if (panel)
            panel.select(object, forceUpdate);

        // issue 4778
        this.syncLocationList();
    }