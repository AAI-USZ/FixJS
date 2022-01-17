function(win)
    {
        var context = this.getContextByWindow(win);

        if (!context)
        {
            if (FBTrace.DBG_ERRORS)
            {
                FBTrace.sysout("unwatchWindow: ERROR no context for win " +
                    Win.safeGetWindowLocation(win));
            }
            return;
        }

        var index = context.windows.indexOf(win);
        if (FBTrace.DBG_WINDOWS)
        {
            FBTrace.sysout("-> tabWatcher.unwatchWindow; " + Win.safeGetWindowLocation(win) +
                " [" + Win.getWindowId(win).toString() + "] " + context.windows.length +
                " - " + win.document.readyState);
        }

        if (index != -1)
        {
            context.windows.splice(index, 1);
            Events.dispatch(this.fbListeners, "unwatchWindow", [context, win]);
        }
    }