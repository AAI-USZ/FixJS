function(cookie)
    {
        // Remember the raw value.
        var rawValue = cookie.value;

        // Unescape '+' characters that are used to encode a space.
        // This isn't done by unescape method.
        var value = cookie.value;
        if (value)
            value = value.replace(/\+/g, " ");

        var c = { 
            name        : cookie.name,
            value       : unescape(value),
            isDomain    : cookie.isDomain,
            host        : cookie.host,
            path        : cookie.path,
            isSecure    : cookie.isSecure,
            expires     : cookie.expires,
            isHttpOnly  : cookie.isHttpOnly,
            rawValue    : rawValue
        };

        return c;
    }