function(prefDomain, prefNames)
    {
        if (FBTrace.DBG_COOKIES)
            FBTrace.sysout("cookies.CookieModule.initialize; ");

        this.traceListener = new TraceListener("cookies.", "DBG_COOKIES", true,
            "chrome://firebug/skin/cookies/trace.css");

        TraceModule.addListener(this.traceListener);

        this.panelName = panelName;
        this.description = Locale.$STR("cookies.modulemanager.description");

        Firebug.ActivableModule.initialize.apply(this, arguments);

        var permTooltip = Firebug.chrome.$("fcPermTooltip");
        permTooltip.fcEnabled = true;

        // All the necessary observers are registered by default. Even if the 
        // panel can be disabled (entirely or for a specific host) there is
        // no simple way to find out this now, as the context isn't available. 
        // All will be unregistered again in the initContext (if necessary).
        // There is no big overhead, the initContext is called just after the
        // first document request.
        //this.registerObservers();

        // Register listener for NetInfoBody (if the API is available) so,
        // a new tab (Cookies) can be appended into the Net panel request info.
        var netInfoBody = Firebug.NetMonitor.NetInfoBody;
        if ("addListener" in netInfoBody)
            netInfoBody.addListener(this.NetInfoBody);

        // Register listener within the Console panel. If document.cookie property
        // is logged, formatted output is used.
        //Firebug.Console.addListener(this.ConsoleListener);

        // Register debugger listener for providing cookie-breakpoints.
        //Firebug.Debugger.addListener(this.DebuggerListener);

        // Dynamically overlay Break on Next button in FB 1.5.1
        // There is a small decoration coming from each panel.
        var bonStack = Firebug.chrome.$("fbBreakOnNextButtonStack");
        if (bonStack)
        {
            var image = document.createElement("image");
            image.setAttribute("id", "fbBreakOnImageCookies");
            image.setAttribute("class", "fbBreakOnImage");
            image.setAttribute("src", "chrome://firebug/skin/cookies/breakOnCookieSingle.png");
            bonStack.appendChild(image);
        }
    }