function(aSubject, aTopic, aData) 
    {
        if (aTopic != "perm-changed")
            return;

        if (FBTrace.DBG_COOKIES)
            FBTrace.sysout("cookies.observe: " + aTopic + ", " + aData);

        var fn = Obj.bind(CookiePermissions.updatePermButton, CookiePermissions);
        TabWatcher.iterateContexts(fn);
    }