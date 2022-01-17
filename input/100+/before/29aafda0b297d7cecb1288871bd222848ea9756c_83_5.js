function(forceOpen, reopenInBrowser)
    {
        if (!forceOpen && Firebug.isDetached())  // detached -> minimized
        {
            var topWin = Firebug.chrome.window.top;
            topWin.exportFirebug();
            topWin.close();

            if (reopenInBrowser)
                Firebug.unMinimize();
            else
                Firebug.minimizeBar();
            Firebug.chrome.syncPositionPref();
        }
        else
        {
            this.detachBar();
        }
    }