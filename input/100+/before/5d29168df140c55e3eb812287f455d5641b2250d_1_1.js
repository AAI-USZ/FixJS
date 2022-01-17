function(options) {
            var lastHash,
                $win = $(window),
                $bod = $('body');

            $.extend(his.options, options);
            
            // Listen to the HTML5 "popstate" event, if supported and desired
            if (his.options.useHistory && his.supportsHistory()) {
                $win.bind("popstate", function(e) {
                    $win.trigger(evt);
                });
            }
            
            // Listen to the HTML5 "hashevent" event, if supported and desired
            if (his.options.useHashchange) {
                $win.bind(hashevt, function(e) {
                    $win.trigger(evt);
                });

                // Hashchange support for older browsers (IE6/7)
                if (!his.supportsHashchange()) {
                    lastHash = window.location.hash;
                    requestInterval(function() {
                        if (lastHash !== window.location.hash) {
                            $win.trigger(hashevt);
                            lastHash = window.location.hash;
                        }
                    }, his.options.poll);
                }
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
        }