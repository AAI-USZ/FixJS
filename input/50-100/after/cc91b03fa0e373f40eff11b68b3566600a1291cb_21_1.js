function(context)
    {
        if (Firebug.CookieModule.isAlwaysEnabled())
            TabWatcher.iterateContexts(Firebug.CookieModule.registerObservers);

        this.setStatus();

        if (FBTrace.DBG_COOKIES)
            FBTrace.sysout("cookies.onResumeFirebug");
    }