function(cookieEvent)
    {
        var context = cookieEvent.context;
        var activeHost = context.cookies.activeHosts[cookieEvent.uri.host];
        var cookies = activeHost.receivedCookies;
        if (!cookies)
            return Locale.$STR("firecookie.console.nocookiesreceived");

        var label = "";
        for (var i=0; i<cookies.length; i++)
            label += cookies[i].cookie.name + ((i<cookies.length-1) ? ", " : "");

        return Str.cropString(label, 75);
    }