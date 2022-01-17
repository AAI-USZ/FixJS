function(infoBox, file)
    {
        var sentCookiesHeader = this.findHeader(file.requestHeaders, "Cookie");
        var receivedCookiesHeader = this.findHeader(file.responseHeaders, "Set-Cookie");

        // Create tab only if there are some cookies.
        if (sentCookiesHeader || receivedCookiesHeader)
            Firebug.NetMonitor.NetInfoBody.appendTab(infoBox, "Cookies",
                Locale.$STR("firecookie.Panel"));
    }