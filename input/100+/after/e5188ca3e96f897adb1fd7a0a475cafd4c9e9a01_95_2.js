function(activeUri, host, cookiePath)
    {
        var pathFilter = Options.get(filterByPath);

        // Get directory path (without the file name)
        var queryStringPos = activeUri.path.lastIndexOf("?");
        var activePath = queryStringPos != -1 ?
            activeUri.path.substr(0, queryStringPos) : activeUri.path;

        // Remove slash at the end of the active path according to step 4 of RFC 6265 section 5.1.4
        var lastChar = activePath.charAt(activePath.length - 1);
        if (lastChar == "/")
            activePath = activePath.substr(0, activePath.length - 1);

        // If the path filter is on, only cookies that match given path
        // according to RFC 6265 section 5.1.4 will be displayed.
        if (pathFilter && (activePath != cookiePath && !(Str.hasPrefix(activePath, cookiePath) &&
            (cookiePath.charAt(cookiePath.length - 1) == "/" ||
                activePath.substr(cookiePath.length, 1) == "/"))))
        {
            return false;
        }

        // The cookie must belong to given URI from this context,
        // otherwise it won't be displayed in this tab.
        var uri = CookieUtils.makeStrippedHost(activeUri.host);
        if (uri == host)
            return true;

        if (uri.length < host.length)
            return false;

        var h = "." + host;
        var u = "." + uri;
        if (u.substr(u.length - h.length) == h)
            return true;

        return false;
    }