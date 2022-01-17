function(request)
    {
        var win = Http.getWindowForRequest(request);
        var tabId = Firebug.getTabIdForWindow(win);
        if (!tabId)
            return;

        if (FBTrace.DBG_COOKIES)
            FBTrace.sysout("cookies.onExamineResponse: " + request.name);

        // Do not collect received cookies if they are not necessary.
        if (!Options.get("cookies.logEvents") && !Options.get("cookies.showRejectedCookies"))
            return;

        // If logging to console is on, remember the set-cookie string, so
        // these cookies can be displayed together e.g. with rejected message.
        var setCookie;
        request.visitResponseHeaders({
            visitHeader: function(header, value) {
                if (header == "Set-Cookie")
                    setCookie = value;
            }
        });

        // Bail out if no cookies is received.
        if (!setCookie)
            return;

        // Try to get the context from the contexts array first. The TabWatacher
        // could return context for the previous page in this tab.
        var context = Firebug.CookieModule.contexts[tabId];
        context = context ? context : TabWatcher.getContextByWindow(win);

        // The context doesn't have to exist due to the activation support.
        if (!context)
        {
            if (FBTrace.DBG_COOKIES) 
                FBTrace.sysout("cookies.onExamineResponse: context is NOT available for:" +
                    request.URI.host + ", tabId: " + tabId);
            return;
        }

        // Associate the setCookie string with proper active host (active
        // host can be the page itself or an embedded iframe or a XHR).
        // Also remember originalURI so, the info where the cookies comes
        // from can be displayed to the user.
        var activeHosts = context.cookies.activeHosts;
        var host = request.URI.host;
        var activeHost = activeHosts[host];

        // Map of all received cookies. The key is cookie-host the value is
        // an array with all cookies with the same host.
        if (!context.cookies.activeCookies)
            context.cookies.activeCookies = [];

        var activeCookies = context.cookies.activeCookies;

        // xxxHonza
        // 1)the activeHost.receivedCookies array shouldn't be recreated
        // if it's already there.
        // 2) There can be more responses from the same domain (XHRs) and so,
        // more received cookies within the page life.
        // 3) The list should make sure that received cookies aren't duplicated.
        // (the same cookie can be received multiple time).
        // 4) Also, rejected cookies, are displayed in the cookie-list too and
        // these shouldn't be duplicated.
        // 5) This should be a map (key == the original host)
        //if (!activeHost.receivedCookies)
            activeHost.receivedCookies = [];

        // Parse all received cookies and store them into activeHost info.
        var cookies = setCookie.split("\n");
        for (var i=0; i<cookies.length; i++)
        {
            var cookie = CookieUtils.parseFromString(cookies[i]);
            cookie.originalURI = request.originalURI;
            if (!cookie.host)
                cookie.host = host;

            // Push into activeHosts
            var cookieWrapper = new Cookie(CookieUtils.makeCookieObject(cookie));
            activeHost.receivedCookies.push(cookieWrapper);

            // Push into activeCookies
            if (!activeCookies[cookie.host])
                activeCookies[cookie.host] = [];

            var activeCookiesForHost = activeCookies[cookie.host];
            activeCookiesForHost[CookieUtils.getCookieId(cookie)] = cookie;

            if (FBTrace.DBG_COOKIES)
                FBTrace.sysout("cookies.Cookie received: " +
                    cookie.host + ", cookie: " + cookie.name, cookie);
        }

        if (FBTrace.DBG_COOKIES)
            FBTrace.sysout("cookies.Set-Cookie: " + setCookie, activeCookies);
    }