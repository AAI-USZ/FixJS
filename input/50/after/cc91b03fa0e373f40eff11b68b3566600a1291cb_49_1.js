function(win)
        {
            // Firebug doesn't have to be loaded in every browser window (see delayed load).
            if (!win.Firebug.TabWatcher)
                return false;

            return win.Firebug.TabWatcher.iterateContexts(function(context)
            {
                if (context.stopped)
                     return true;
            });
        }