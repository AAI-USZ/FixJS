function(aSubject, aTopic, aData)
    {
        try
        {
            if (!Firebug.CookieModule.isAlwaysEnabled())
                return;

            // See: https://developer.mozilla.org/en/XPCOM_Interface_Reference/nsICookieService
            // For all possible values.
            if (aTopic == "cookie-changed")
            {
                var cookies = []
                if (aData == "batch-deleted")
                {
                    // In this case the subject is nsIArray.
                    var enumerator = aSubject.QueryInterface(Ci.nsIArray).enumerate();
                    while (enumerator.hasMoreElements())
                        cookies.push(enumerator.getNext().QueryInterface(Ci.nsICookie2));

                    // The event will be further distributed as standard "delete" event.
                    aData = "deleted";
                }
                else
                {
                    aSubject = aSubject ? aSubject.QueryInterface(Ci.nsICookie2) : null;
                    cookies.push(aSubject);
                }

                for (var i=0; i<cookies.length; i++)
                    this.iterateContexts(this.onCookieChanged, cookies[i], aData);
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
            {
                FBTrace.sysout("cookies.CookieObserver.observe; ERROR " +
                    aTopic + ", " + aData, err);
                FBTrace.sysout("cookies.CookieObserver.observe; subject ", aSubject);
            }
        }
    }