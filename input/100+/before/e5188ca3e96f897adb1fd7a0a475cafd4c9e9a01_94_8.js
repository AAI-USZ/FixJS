function(context)
    {
        if (FBTrace.DBG_COOKIES)
            FBTrace.sysout("cookies.onCreateCookie");

        // There is an excepion if the window is closed or not initialized (empty tab)
        var host;
        try {
            host = context.window.location.host
        }
        catch (err) {
            alert(Locale.$STR("firecookie.message.There_is_no_active_page"));
            return;
        }

        // Name and domain.
        var cookie = new Object();
        cookie.name = this.getDefaultCookieName(context);
        cookie.host = host;

        // The edit dialog uses raw value.
        cookie.rawValue = Locale.$STR("firecookie.createcookie.defaultvalue");

        // Default path
        var path = context.window.location.pathname || "/";
        cookie.path = path.substr(0, (path.lastIndexOf("/") || 1));

        // Set defaul expiration time.
        cookie.expires = this.getDefaultCookieExpireTime();

        var params = {
            cookie: cookie,
            action: "create",
            window: context.window,
            EditCookie: EditCookie,
            Firebug: Firebug,
            FBTrace: FBTrace,
        };

        var parent = context.chrome.window;
        parent.openDialog("chrome://firebug/content/cookies/editCookie.xul",
            "_blank", "chrome,centerscreen,resizable=yes,modal=yes",
            params);
    }