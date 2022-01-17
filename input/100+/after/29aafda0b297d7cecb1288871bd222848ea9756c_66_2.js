function()
    {
        if (!Firebug.CookieModule.isEnabled(this.context))
            return;

        // Create cookie list table.
        this.table = CookieReps.CookieTable.createTable(this.panelNode);

        // Cookies are displayed only for web pages.
        var location = this.context.window.location;
        if (!location)
            return;

        var protocol = location.protocol;
        if (protocol.indexOf("http") != 0)
            return;

        // Get list of cookies for the current page.
        var cookies = [];
        var iter = cookieManager.enumerator;
        while (iter.hasMoreElements())
        {
            var cookie = iter.getNext();
            if (!cookie)
                break;

            cookie = cookie.QueryInterface(Ci.nsICookie2);
            if (!CookieObserver.isCookieFromContext(this.context, cookie))
                continue;

            var cookieWrapper = new Cookie(CookieUtils.makeCookieObject(cookie));
            cookies.push(cookieWrapper);
        }

        // If the filter allow it, display all rejected cookies as well.
        if (Options.get(showRejectedCookies))
        {
            // xxxHonza the this.context.cookies is sometimes null, but
            // this must be because FB isn't correctly initialized.
            if (!this.context.cookies)
            {
                if (FBTrace.DBG_COOKIES) 
                {
                    FBTrace.sysout(
                        "cookies.Cookie context isn't properly initialized - ERROR: " +
                        this.context.getName());
                }
                return;
            }

            var activeHosts = this.context.cookies.activeHosts;
            for (var hostName in activeHosts)
            {
                var host = activeHosts[hostName];
                if (!host.rejected)
                    continue;

                var receivedCookies = host.receivedCookies;
                if (receivedCookies)
                    cookies = Arr.extendArray(cookies, receivedCookies);
            }
        }

        // Generate HTML list of cookies using domplate.
        if (cookies.length)
        {
            var header = Dom.getElementByClass(this.table, "cookieHeaderRow");
            var tag = CookieReps.CookieRow.cookieTag;
            var row = tag.insertRows({cookies: cookies}, header)[0];
            for (var i=0; i<cookies.length; i++)
            {
                var cookie = cookies[i];
                cookie.row = row;

                Breakpoints.updateBreakpoint(this.context, cookie);
                row = row.nextSibling;
            }
        }

        if (FBTrace.DBG_COOKIES)
            FBTrace.sysout("cookies.Cookie list refreshed.", cookies);

        // Sort automaticaly the last sorted column. The preference stores
        // two things: name of the sorted column and sort direction asc|desc.
        // Example: colExpires asc
        var prefValue = Options.get(lastSortedColumn);
        if (prefValue) {
            var values = prefValue.split(" ");
            CookieReps.CookieTable.sortColumn(this.table, values[0], values[1]);
        }

        // Update visibility of columns according to the preferences
        var hiddenCols = Options.get(hiddenColsPref);
        if (hiddenCols)
            this.table.setAttribute("hiddenCols", hiddenCols);
    }