function()
    {
        // In order to keep built in panels (like Console, Script...) be the first one
        // and insert all panels coming from extension at the end, catch any early registered
        // panel (i.e. before FBL.initialize is called, such as YSlow) in a temp array
        // that is appended at the end as soon as FBL.initialize is called.
        if (earlyRegPanelTypes)
            earlyRegPanelTypes.push.apply(earlyRegPanelTypes, arguments);
        else
            panelTypes.push.apply(panelTypes, arguments);

        for (var i = 0; i < arguments.length; ++i)
            panelTypeMap[arguments[i].prototype.name] = arguments[i];

        if (FBTrace.DBG_REGISTRATION)
        {
            for (var i = 0; i < arguments.length; ++i)
                FBTrace.sysout("registerPanel "+arguments[i].prototype.name);
        }

        // If Firebug is not initialized yet the UI will be updated automatically soon.
        if (!this.isInitialized)
            return;

        Firebug.chrome.syncMainPanels();
        Firebug.chrome.syncSidePanels();
    }