function(win)
    {
        var context = this.getContextByWindow(win);

        if (!context)
        {
            if (FBTrace.DBG_ERRORS)
            {
                FBTrace.sysout("unwatchWindow: no context for win " +
                    Win.safeGetWindowLocation(win));
            }
            return;
        }

        var index = context.windows.indexOf(win);
        if (FBTrace.DBG_WINDOWS)
        {
            FBTrace.sysout("-> tabWatcher.unwatchWindow context: " + context.getName() +
                " index of win: " + index + "/" + context.windows.length, context.windows);
        }

        if (index != -1)
        {
            context.windows.splice(index, 1);
            Events.dispatch(this.fbListeners, "unwatchWindow", [context, win]);
        }
    }