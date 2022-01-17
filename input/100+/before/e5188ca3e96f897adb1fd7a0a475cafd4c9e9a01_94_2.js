function()
    {
        var elements = ["fcCookiesMenu", "fcExportAll", "fcExportForSite", "fcRemoveAllSession",
            "fcRemoveAll", "fcCreate", "fcCookieViewAll", "fcCookieViewExceptions",
            "fcToolsMenu", "fcFilterMenu", "fcFilterByPath",
            "fcShowRejectedCookies", "fbConsoleFilter-cookies"];

        for (var i=0; i<elements.length; i++)
        {
            var element = Firebug.chrome.$(elements[i]);
            if (element.hasAttribute("label"))
                Locale.internationalize(element, "label");

            if (element.hasAttribute("tooltiptext"))
                Locale.internationalize(element, "tooltiptext");
        }
    }