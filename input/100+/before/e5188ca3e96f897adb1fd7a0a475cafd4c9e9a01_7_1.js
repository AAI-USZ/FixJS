function(win, uri, userCommands)
    {
        if (FBTrace.DBG_WINDOWS)
            FBTrace.sysout("-> tabWatcher.watchTopWindow for: " +
                (uri instanceof nsIURI?uri.spec:uri) + ", tab: " +
                Win.getWindowProxyIdForWindow(win));

        if (!win)
        {
            if (FBTrace.DBG_ERRORS)
                FBTrace.sysout("-> tabWatcher.watchTopWindow should not have a null window!");
            return false;
        }

        // Do not use Firefox.getCurrentBrowser(); since the current tab can be already
        // different from what is passed into this function (see issue 4681)
        // Can be also null, if the window is just closing.
        var selectedBrowser = Win.getBrowserByWindow(win);

        var context = this.getContextByWindow(win);
        if (context) // then we've looked at this window before in this FF session...
        {
            if (FBTrace.DBG_ACTIVATION)
                FBTrace.sysout("-> tabWatcher.watchTopWindow context exists "+context.getName());

            if (!this.shouldShowContext(context))
            {
                // ...but now it is not wanted.
                if (context.browser)
                    delete context.browser.showFirebug;
                this.unwatchContext(win, context);

                return;  // did not create a context
            }
            // else we should show
        }
        else // then we've not looked this window in this session
        {
            // decide whether this window will be debugged or not
            var url = (uri instanceof nsIURI) ? uri.spec : uri;
            if (!this.shouldCreateContext(selectedBrowser, url, userCommands))
            {
                if (FBTrace.DBG_ACTIVATION)
                    FBTrace.sysout("-> tabWatcher will not create context ");

                delete selectedBrowser.showFirebug;
                this.watchContext(win, null);

                return false;  // we did not create a context
            }

            var browser = this.getBrowserByWindow(win);

            context = this.createContext(win, browser, Firebug.getContextType());
        }

        if (win instanceof Ci.nsIDOMWindow && win.parent == win && context)
        {
            // xxxHonza: This place can be called multiple times for one window, so
            // make sure event listeners are not registered twice.
            // There should be a better way to find out whether the listeneres are actually
            // registered for the window.
            context.removeEventListener(win, "pageshow", onLoadWindowContent,
                onLoadWindowContent.capturing);
            context.removeEventListener(win, "DOMContentLoaded", onLoadWindowContent,
                onLoadWindowContent.capturing);

            // Re-register again since it could have been done too soon before.
            context.addEventListener(win, "pageshow", onLoadWindowContent,
                onLoadWindowContent.capturing);
            context.addEventListener(win, "DOMContentLoaded", onLoadWindowContent,
                onLoadWindowContent.capturing);

            if (FBTrace.DBG_WINDOWS)
                FBTrace.sysout("-> tabWatcher.watchTopWindow addEventListener for pageshow, " +
                    "DomContentLoaded " + Win.safeGetWindowLocation(win));
        }

        // Dispatch watchWindow for the outer most DOM window
        this.watchWindow(win, context);

        // This is one of two places that loaded is set. The other is in watchLoadedTopWindow
        if (context && !context.loaded)
        {
            context.loaded = !context.browser.webProgress.isLoadingDocument;

            // If the loaded flag is set, the proper event should be dispatched.
            if (context.loaded)
                Events.dispatch(this.fbListeners, "loadedContext", [context]);

            if (FBTrace.DBG_WINDOWS)
                FBTrace.sysout("-> tabWatcher context " +
                    (context.loaded ? '*** LOADED ***' : 'isLoadingDocument') +
                    " in watchTopWindow, id: "+context.uid+", uri: "+
                    (uri instanceof nsIURI ? uri.spec : uri));
        }

        if (context && !context.loaded && !context.showContextTimeout)
        {
            this.rushShowContextTimeout(win, context, 20);
        }
        else
        {
            if (FBTrace.DBG_WINDOWS)
                FBTrace.sysout("-> watchTopWindow context.loaded:" + context.loaded + " for " +
                    context.getName());

            this.rushShowContext(win, context);
        }

        return context;  // we did create or find a context
    }