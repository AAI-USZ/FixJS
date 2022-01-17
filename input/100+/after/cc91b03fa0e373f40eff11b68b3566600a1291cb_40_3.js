function(forceOpen, panelName)
    {
        if (panelName)
            Firebug.chrome.selectPanel(panelName);
        // if is deactivated.
        if (!Firebug.currentContext)
        {
            var context = Firebug.getContext();
            // Be sure the UI is open for a newly created context.
            forceOpen = true;
        }

        if (Firebug.isDetached())
        {
            //in detached mode, two possibilities exist, the firebug windows is 
            // the active window of the user or no.
            if ( !Firebug.chrome.hasFocus() || forceOpen)
                Firebug.chrome.focus();
            else
                Firebug.minimizeBar();
        }
        // toggle minimize
        else if (Firebug.isMinimized())
        {
            // be careful, unMinimize func always sets placement to
            // inbrowser first then unminimizes. when we want to
            // unminimize in detached mode must call detachBar func.
            if (Firebug.framePosition == "detached")
                this.detachBar();
            else
                Firebug.unMinimize();
        }
        // else isInBrowser
        else if (!forceOpen)
        {
            Firebug.minimizeBar();
        }

        return true;
    }