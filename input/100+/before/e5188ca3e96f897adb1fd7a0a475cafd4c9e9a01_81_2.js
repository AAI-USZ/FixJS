function(win, context)
    {
        if (!context)
            context = this.getContextByWindow(Win.getRootWindow(win));

        var location = Win.safeGetWindowLocation(win);

        // For every window we watch, prepare for unwatch. It's OK if this is called
        // more times (see 2695).
        if (context)
            TabWatcherUnloader.registerWindow(win);

        // Unfortunately, dummy requests that trigger the call to watchWindow
        // are called several times, so we have to avoid dispatching watchWindow
        // more than once
        if (context && context.windows.indexOf(win) == -1)
        {
            context.windows.push(win);

            if (FBTrace.DBG_WINDOWS)
                FBTrace.sysout("-> watchWindow register *** FRAME *** to context for " +
                    "win.location: " + location);

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