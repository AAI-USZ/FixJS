function()
    {
        if (this.observersRegistered)
        {
            if (FBTrace.DBG_COOKIES)
                FBTrace.sysout("cookies.cookieModule.registerObservers; Observers ALREADY registered");
            return;
        }

        observerService.addObserver(HttpObserver, "http-on-modify-request", false);
        observerService.addObserver(HttpObserver, "http-on-examine-response", false);
        observerService.addObserver(PermissionObserver, "perm-changed", false);
        registerCookieObserver(CookieObserver);
        prefs.addObserver(networkPrefDomain, PrefObserver, false);

        this.observersRegistered = true;

        if (FBTrace.DBG_COOKIES)
            FBTrace.sysout("cookies.cookieModule.registerObservers;");
    }