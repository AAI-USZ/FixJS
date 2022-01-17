function()
    {
        this.createDateTimeField();

        var params = this.window.arguments[0];
        this.params = params;
        this.cookie = params.cookie;

        this.nameNode = $("fcName", this.window);
        this.valueNode = $("fcValue", this.window);
        this.domainNode = $("fcDomain", this.window);
        this.pathNode = $("fcPath", this.window);
        this.expireNode = $("fcExpire", this.window);
        this.sessionNode = $("fcSession", this.window);
        this.secureNode = $("fcSecure", this.window);
        this.httpOnly = $("fcHttpOnly", this.window);
        this.URLEncodeValue = $("fbURLEncodeValue", this.window);

        // Fix for issue 39: decode cookie name and value for usage in the dialog.
        // It'll be encoded again when OK is pressed.
        // Don't escape using encodeURIComponent sinc "+" would be changed, but 
        // it's valid replacement for space.
        // This is also necessary for issue 45.
        this.nameNode.value = unescape(this.cookie.name);
        this.valueNode.value = unescape(this.cookie.rawValue);

        this.domainNode.value = this.cookie.host;
        this.pathNode.value = this.cookie.path;
        this.secureNode.checked = this.cookie.isSecure;
        this.httpOnly.checked = this.cookie.isHttpOnly;
        this.URLEncodeValue.checked = this.cookie.rawValue != unescape(this.cookie.rawValue);

        if (this.cookie.expires)
        {
            var expires = new Date(this.cookie.expires * 1000);
            this.expireNode.value = expires.toGMTString();
        }
        else
        {
            this.sessionNode.checked = true;

            // Set default value for expire time (current time + some time, see prefs 
            // defaultInterval) so, the cookie doesn't disappear if the session box 
            // is just unchecked.

            // xxxHonza: the default time is always set to the current time.
            //if (!this.expireNode.value)
            {
                var expireTime = Firebug.CookieModule.getDefaultCookieExpireTime();
                var expires = new Date(expireTime * 1000);
                this.expireNode.value = expires.toGMTString();
            }
        }

        // Update expire date-time picker.
        this.onSession();

        // Translate all string in the UI.
        this.fcInternationalizeUI();
    }