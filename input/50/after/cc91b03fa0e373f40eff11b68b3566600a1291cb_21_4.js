function(observer)
    {
        if (this.hasObservers())
            TabWatcher.iterateContexts(Firebug.CookieModule.registerObservers);
        else
            TabWatcher.iterateContexts(Firebug.CookieModule.unregisterObservers);

        this.setStatus();
    }