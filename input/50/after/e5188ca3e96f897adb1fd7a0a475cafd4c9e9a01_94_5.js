function()
    {
        TabWatcher.iterateContexts(Firebug.CookieModule.unregisterObservers);

        this.setStatus();

        if (FBTrace.DBG_COOKIES)
            FBTrace.sysout("cookies.onSuspendFirebug");
    }