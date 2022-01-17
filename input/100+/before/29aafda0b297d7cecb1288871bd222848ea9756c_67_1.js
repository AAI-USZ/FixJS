function(context, option, location)
    {
        var location = location ? location : context.browser.currentURI;
        permissionManager.remove(location.host, "cookie");
        switch(option)
        {
            case "host-allow-session":
                permissionManager.add(location, "cookie", Ci.nsICookiePermission.ACCESS_SESSION);
                break;
            case "host-allow":
                permissionManager.add(location, "cookie", permissionManager.ALLOW_ACTION); 
                break;
            case "host-deny":
                permissionManager.add(location, "cookie", permissionManager.DENY_ACTION);

            case "default-deny":
                if (Options.get(clearWhenDeny))
                    Firebug.CookieModule.onRemoveAll(context);
                break;
        }

        this.updatePermButton(context);
    }