function(aSubject, aTopic, aData) 
    {
        if (aTopic != "perm-changed")
            return;

        if (FBTrace.DBG_COOKIES)
            FBTrace.sysout("cookies.observe: " + aTopic + ", " + aData);

        var fn = CookiePermissions.updatePermButton;
        TabWatcher.iterateContexts(fn);
    }