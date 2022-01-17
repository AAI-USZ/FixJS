function(file)
    {
        var header = findHeader(file.responseHeaders, "set-cookie");

        var result = [];
        var cookies = header ? header.split("\n") : [];
        for (var i=0; i<cookies.length; i++)
        {
            var cookie = this.parseCookieFromResponse(cookies[i]);
            if (!cookie.domain) 
                cookie.domain = file.request.URI.host;
            result.push(cookie);
        }

        return result;
    }