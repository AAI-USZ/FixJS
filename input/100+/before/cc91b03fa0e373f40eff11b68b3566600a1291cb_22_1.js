function(aSubject, aTopic, aData)
    {
        try
        {
            if (!Firebug.CookieModule.isAlwaysEnabled())
                return;

            if (aTopic == "cookie-changed")
            {
                aSubject = aSubject ? aSubject.QueryInterface(Ci.nsICookie2) : null;
                this.iterateContexts(this.onCookieChanged, aSubject, aData);
            }
            else if (aTopic == "cookie-rejected")
            {
                aSubject = aSubject.QueryInterface(Ci.nsIURI);
                this.iterateContexts(this.onCookieRejected, aSubject, aData);
            }
        }
        catch (err)
        {
            if (FBTrace.DBG_ERRORS)
                FBTrace.sysout("cookies.CookieObserver.observe ERROR " + aTopic, err);
        }
    }