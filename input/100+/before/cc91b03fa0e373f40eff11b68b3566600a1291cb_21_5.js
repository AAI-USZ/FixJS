function(option, location)
    {
        var host = getURIHost(location);

        // In case of local files or system pages use this labels instead of host.
        // xxxHonza: the panel should be automatically disabled for local files
        // and system pages as there are no cookies associated.
        // These options shouldn't be available at all.
        if (isSystemURL(location.spec))
            host = Locale.$STR("firecookie.SystemPages");
        else if (!getURIHost(location))
            host = Locale.$STR("firecookie.LocalFiles");

        // Translate these two options in panel activable menu from firecookie.properties
        switch (option)
        {
        case "disable-site":
            return Locale.$STRF("cookies.HostDisable", [host]);
        case "enable-site":
            return Locale.$STRF("cookies.HostEnable", [host]);
        }

        return Firebug.ActivableModule.getMenuLabel.apply(this, arguments);
    }