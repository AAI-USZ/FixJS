function(activeUri, host, path)
    {
        var pathFilter = Options.get(filterByPath);

        // Get directory path (without the file name)
        var activePath = activeUri.path.substr(0, (activeUri.path.lastIndexOf("/") || 1));

        // Append slash at the end of the active path, so it mach the cookie's path
        // in the case that it has slash at the end.
        var lastChar = activePath.charAt(activePath.length - 1);
        if (lastChar != "/")
            activePath += "/";

        // If the path filter is on, only cookies that match given path should be displayed.
        if (pathFilter && (activePath.indexOf(path) != 0))
            return false;

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