function(forceOpen, reopenInBrowser)
    {
        //detached -> inbrowser
        if (!forceOpen && Firebug.isDetached())
        {
            var topWin = Firebug.chrome.window.top;
            topWin.exportFirebug();
            topWin.close();

            if (reopenInBrowser)
            {
                // Is Firebug deactivated ? if yes, should be
                // activated at first, then unminimize.
                if (!Firebug.currentContext)
                {
                    var context = Firebug.getContext();
                }
                Firebug.unMinimize();
            }
            else
            {
                Firebug.minimizeBar();
            }

            Firebug.chrome.syncPositionPref();
        }
        // is minimized now but the last time that has been closed, was in detached mode,
        // so it should be returned to in browser mode because the user has pressed CTRL+F12.
        else if (Firebug.framePosition == "detached" && Firebug.isMinimized())
        {
            Firebug.unMinimize();
            Firebug.chrome.syncPositionPref();
        }
        // else is in browser mode, then switch to detached mode.
        else
        {
            this.detachBar();
        }
    }