function()
    {
        TabWatcher.iterateContexts(Firebug.CookieModule.unregisterObservers);

        top.document.getElementById("firebugStatus").removeAttribute(panelName);

        if (FBTrace.DBG_COOKIES)
            FBTrace.sysout("cookies.onSuspendFirebug");
    }