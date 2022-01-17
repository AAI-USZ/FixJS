function(cookie)
    {
        var limit = 200;
        var value = cookie.cookie.value;
        if (value.length > limit)
            return Str.escapeNewLines(value.substr(0, limit) + "...");
        else
            return Str.escapeNewLines(value);
    }