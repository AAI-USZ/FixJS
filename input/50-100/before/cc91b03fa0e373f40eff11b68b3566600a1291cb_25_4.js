function(cookie)
    {
        if (FBTrace.DBG_COOKIES)
            FBTrace.sysout("cookies.onClearValue;", cookie);

        var newCookie = new Firebug.CookieModule.Cookie(cookie.cookie);
        newCookie.cookie.rawValue = "";
        Firebug.CookieModule.createCookie(newCookie);
    }