function($) {
    // can use $(window).bind("htmlhistory", fn) or $(window).htmlhistory(fn)
    var evt = 'htmlhistory',
        hash = 'onhashchange',
        hashevt = 'hashchange';
    
    $.fn.htmlhistory = function(handler) {
        return handler ? this.bind(evt, handler) : this.trigger(evt);
    };
    var his = $.htmlhistory = {

        // default options
        options: {
            useHistory: true, // whether we use HTML5 History Management to change the current path
            useHashchange: true, // whether we use HTML5 Hashchange to listen to the URL hash
            poll: 250, // when using Hashchange in browsers without it, how often to poll the hash (in ms)
            interceptLinks: true, // do we intercept all relative links to avoid some page reloads?
            disableHashLinks: true, // do we ensure all links with href=# are not followed (this would mess with our history)?
            triggerOnLoad: true, // send the hash event on load
            hash:'#!'
        },

        // call this once when your app is ready to use htmlhistory
        init: function(options) {
            var lastHash,
                $win = $(window),
                $bod = $('body');

            $.extend(his.options, options);
            
            // Listen to the HTML5 "popstate" event, if supported and desired
            if (his.options.useHistory && Modernizr.history) {
                $win.bind('popstate', function(e) {
                    $win.trigger(evt);
                });
            }
            
            // Listen to the HTML5 "hashevent" event, if supported and desired
            if (his.options.useHashchange && !Modernizr.history) {
                $win.bind(hashevt, function(e) {
                    $win.trigger(evt);
                });
                // Hashchange support for older browsers (IE6/7)
                if (!Modernizr.hashchange) {
                    lastHash = window.location.hash;
                    requestInterval(function() {
                        if (lastHash !== window.location.hash) {
                            $win.trigger(evt);
                            lastHash = window.location.hash;
                        }
                    }, his.options.poll);
                }
                if (his.options.triggerOnLoad) { $win.trigger(evt); }
            }
            
            // Intercept all relative links on the page, to avoid unneccesary page refreshes
            if (his.options.interceptLinks) {
                $bod.delegate('a[href=^"/"]', 'click', function(e) {
                    his.changeTo($(this).attr('href'));
                    e.preventDefault();
                });
            }
            
            // Ensure all the href=# links on the page don't mess with things
            if (his.options.disableHashLinks) {
                $bod.delegate('a[href=#]', 'click', function(e) {
                    e.preventDefault();
                });
            }
        },

        // Call to manually navigate the app somewhere
        changeTo: function(path) {
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
        },

        // Return the current url
        url: function() {
            // If we're using History Management, just push an entry
            if (his.options.useHistory && Modernizr.history) {
                return window.location.pathname;
            } else {
                return window.location.hash.split(his.options.hash).join('');
            }
        }
    };
}