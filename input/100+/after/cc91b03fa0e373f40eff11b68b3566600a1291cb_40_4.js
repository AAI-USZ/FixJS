function()  // just pull down the UI, but don't deactivate the context
    {
        if (Firebug.isDetached())
        {
            // TODO reattach

            // window is closing in detached mode
            if (Firebug.chrome.window.top)
            {
                topWindow = Firebug.chrome.window.top;
                topWindow.exportFirebug();
                topWindow.close();
            }

            Firebug.setPlacement("minimized");
            this.showBar(false);
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