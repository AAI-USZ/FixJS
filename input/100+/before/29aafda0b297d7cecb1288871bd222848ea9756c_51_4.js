function(progress, request, flag, status)
    {
        if (FBTrace.DBG_WINDOWS)
        {
            var win = progress.DOMWindow;
            FBTrace.sysout("-> FrameProgressListener.onStateChanged for: " +
                Http.safeGetRequestName(request) + ", win: " + win.location.href +
                ", content URL: " + (win.document ? win.document.URL : "no content URL") +
                " " + Http.getStateDescription(flag));
        }

        if (flag & STATE_IS_REQUEST && flag & STATE_START)
        {
            // We need to get the hook in as soon as the new DOMWindow is created, but before
            // it starts executing any scripts in the page.  After lengthy analysis, it seems
            // that the start of these "dummy" requests is the only state that works.

            var safeName = Http.safeGetRequestName(request);
            if (safeName && ((safeName == dummyURI) || safeName == "about:document-onload-blocker"))
            {
                var win = progress.DOMWindow;
                // Another weird edge case here - when opening a new tab with about:blank,
                // "unload" is dispatched to the document, but onLocationChange is not called
                // again, so we have to call watchTopWindow here

                if (win.parent == win && (win.location.href == "about:blank"))
                {
                    Firebug.TabWatcher.watchTopWindow(win, win.location.href);
                    return;
                }
                else
                {
                    Firebug.TabWatcher.watchWindow(win);
                }
            }
        }

        // Later I discovered that XHTML documents don't dispatch the dummy requests, so this
        // is our best shot here at hooking them.
        if (flag & STATE_IS_DOCUMENT && flag & STATE_TRANSFERRING)
        {
            Firebug.TabWatcher.watchWindow(progress.DOMWindow);
            return;
        }

    }