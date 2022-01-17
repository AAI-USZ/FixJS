function(win, context, skipCompletedDocuments)
    {
        if (!context)
            context = this.getContextByWindow(Win.getRootWindow(win));

        var location = Win.safeGetWindowLocation(win);

        // For every window we watch, prepare for unwatch. It's OK if this is called
        // more times (see 2695).
        if (context)
            TabWatcherUnloader.registerWindow(win);

        try
        {
            // If the documents is already completed do not register the window
            // it should be registered already at this point
            // This condition avoids situation when "about:document-onload-blocker"
            // and STATE_START is fired for a window, which is consequently never
            // firing "unload" and so, stays registered within context.windows
            // See issue 5582 (comment #4)
            if (skipCompletedDocuments && win.document.readyState == "complete")
                return;
        }
        catch (err)
        {
        }

        // Unfortunately, dummy requests that trigger the call to watchWindow
        // are called several times, so we have to avoid dispatching watchWindow
        // more than once
        if (context && context.windows.indexOf(win) == -1)
        {
            context.windows.push(win);

            if (FBTrace.DBG_WINDOWS)
            {
                FBTrace.sysout("-> tabWatcher.watchWindow; " + Win.safeGetWindowLocation(win) +
                    " [" + Win.getWindowId(win).toString() + "] " + context.windows.length +
                    " - " + win.document.readyState);
            }

            Events.dispatch(this.fbListeners, "watchWindow", [context, win]);

            if (FBTrace.DBG_WINDOWS)
            {
                FBTrace.sysout("-> watchWindow for: " + location + ", context: " + context.uid);

                if (context)
                {
                    for (var i = 0; i < context.windows.length; i++)
                        FBTrace.sysout("context: " + context.uid + ", window in context: " +
                            context.windows[i].location.href);
                }
            }
        }
    }