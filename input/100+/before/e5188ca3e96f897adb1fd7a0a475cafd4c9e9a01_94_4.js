function(event) 
    {
        var view = event.target.defaultView;
        var context = TabWatcher.getContextByWindow(view);
        if (!context)
            return;

        var panel = context.getPanel(panelName, true);
        if (panel)
            panel.clear();

        if (FBTrace.DBG_COOKIES || FBTrace.DBG_ERRORS)
        {
            var tabId = Firebug.getTabIdForWindow(view);

            if (FBTrace.DBG_COOKIES)
                FBTrace.sysout("cookies.On before unload tab:  " + tabId);

            if (contexts[tabId])
            {
                delete contexts[tabId];

                if (FBTrace.DBG_ERRORS)
                    FBTrace.sysout("cookies.!!! There is a temp context leak!");
            }
        }
    }