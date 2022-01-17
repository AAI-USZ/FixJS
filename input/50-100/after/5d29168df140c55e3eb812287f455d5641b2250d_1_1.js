function(path) {
            var $win = $(window);
            // If we're using History Management, just push an entry
            if (his.options.useHistory && Modernizr.history) {
                window.history.pushState(null, null, path);
                $win.trigger(evt);
            } else {
                // Make sure there's a hash (going from foo.com#bar to foo.com would trigger a reload in Firefox, sadly)
                if (path.indexOf('#') < 0) {
                    path = his.options.hash + path;
                }
                // Otherwise, navigate to the new URL.  Might reload the browser.  Might trigger a hashchange.
                window.location.href = path;
            }
        }