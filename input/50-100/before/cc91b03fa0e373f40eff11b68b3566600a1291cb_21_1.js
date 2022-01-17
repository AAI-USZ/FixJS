function(context)
    {
        if (Firebug.CookieModule.isAlwaysEnabled())
            TabWatcher.iterateContexts(Firebug.CookieModule.registerObservers);

        top.document.getElementById("firebugStatus").setAttribute(panelName, "on");

        if (FBTrace.DBG_COOKIES)
            FBTrace.sysout("cookies.onResumeFirebug");
    }