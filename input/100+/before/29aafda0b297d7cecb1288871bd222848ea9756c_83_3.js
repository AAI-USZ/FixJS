function(forceOpen, panelName)
    {
        if (panelName)
            Firebug.chrome.selectPanel(panelName);

        var webApp = Firebug.connection.getCurrentSelectedWebApp();
        var context = Firebug.connection.getContextByWebApp(webApp);
        if (!context)  // then we are not debugging the selected tab
        {
            context = Firebug.connection.getOrCreateContextByWebApp(webApp);
            forceOpen = true;  // Be sure the UI is open for a newly created context
        }
        else  // we were debugging
        {

        }

        if (Firebug.isDetached()) // if we are out of the browser focus the window
            Firebug.chrome.focus();
        else if (Firebug.framePosition == "detached")
            this.detachBar();
        else if (Firebug.isMinimized()) // toggle minimize
            Firebug.unMinimize();
        else if (!forceOpen)  // else isInBrowser
            Firebug.minimizeBar();

        return true;
    }