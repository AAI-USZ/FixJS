function(context, cookie, action)
    {
        // If the action == "cleared" the cookie is *not* set. This action is triggered
        // when all cookies are removed (cookieManager.removeAll)
        // In such a case let's displaye the event in all contexts.
        if (cookie && !this.isCookieFromContext(context, cookie))
            return;

        if (FBTrace.DBG_COOKIES)
            FBTrace.sysout("cookies.onCookieChanged: '" + (cookie ? cookie.name : "null") +
                "', " + action);

        if (action != "cleared")
        {
            // If log into the Console tab is on, create "deleted", "added" and "changed" events.
            if (logEvents())
                this.logEvent(new CookieEvents.CookieChangedEvent(context, CookieUtils.makeCookieObject(cookie),
                    action), context, "cookie");

            // Break on cookie if "Break On" is activated or if a cookie breakpoint exist.
            Breakpoints.breakOnCookie(context, cookie, action);
        }

        switch(action)
        {
          case "deleted":
            this.onRemoveCookie(context, cookie);
            break;
          case "added":
            this.onAddCookie(context, cookie);
            break;
          case "changed":
            this.onUpdateCookie(context, cookie);
            break;
          case "cleared":
            this.onClear(context);
            return;
        }
    }