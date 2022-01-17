function()
    {
        if (!this.checkValues())
            return;

        var isSession = this.sessionNode.checked;
        var host = this.domainNode.value;

        var cookieName = this.nameNode.value;
        var cookieValue = this.valueNode.value;

        // Fix for issue 39: Can't create cookies with ';' in the name
        // But do not escape all,see issue 60: "[" and "]" characters get badly encoded
        // on cookie name upon editing
        cookieName = cookieName.replace(/\;/g, "%3B");

        // According to the spec cookie value must be escaped
        var cookieValue = escape(cookieValue);

        // Issue 45: When I copy and paste or edit a cookie contents + (plus) signs
        // get converted to spaces.
        cookieValue = cookieValue.replace(/\+/g, "%2B");

        // Create a helper cookie object from the provided data.
        var values = {
            name: cookieName,
            rawValue: cookieValue,
            path: this.pathNode.value,
            host: host,
            isSecure: this.secureNode.checked,
            isHttpOnly: this.httpOnly.checked,
            isDomain: (host.charAt(0) == "."),
            expires: null // is computed below
        };

        // will be immediately removed.
        if (!isSession)
        {
            // If it isn't a session cookie set the proper expire time.
            var expires = new Date();
            expires.setTime(Date.parse(this.expireNode.value));
            values.expires = Math.floor(expires.valueOf() / 1000);
        }

        // Create/modify cookie.
        var cookie = new Cookie(values);
        Firebug.CookieModule.createCookie(cookie);

        // Close dialog.
        this.window.close();
    }