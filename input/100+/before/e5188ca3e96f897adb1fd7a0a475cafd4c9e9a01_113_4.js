function()  // just pull down the UI, but don't deactivate the context
    {
        if (Firebug.isDetached())  // TODO disable minimize on externalMode
        {
            // TODO reattach
            Firebug.toggleDetachBar(false, false);
            Firebug.chrome.focus();
        }
        else // inBrowser -> minimized
        {
            Firebug.setPlacement("minimized");
            this.showBar(false);

            // Focus the browser window again
            if (Firebug.currentContext)
                Firebug.currentContext.window.focus();
        }
    }