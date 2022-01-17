function(cookie)
    {
        if (FBTrace.DBG_COOKIES)
            FBTrace.sysout("cookies.onClearValue;", cookie);

        var newCookie = new Cookie(cookie.cookie);
        newCookie.cookie.rawValue = "";
        Firebug.CookieModule.createCookie(newCookie);
    }