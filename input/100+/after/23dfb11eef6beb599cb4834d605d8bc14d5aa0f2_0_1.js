function fetchFragment(state, popped) {
            console.log('fetchFragment');
            var href = state.path;
            startLoading();
            markScrollTop();

            //caching!
            if (fragmentCache[href]) {
                console.log(format('cached {0} at {1}', href, state.scrollTop));
                updateContent(fragmentCache[href], href, popped, {scrollTop: state.scrollTop});
            } else {
                console.log(format('fetching {0} at {1}', href, state.scrollTop));

                // Chrome doesn't obey the Vary header, so we need to keep the fragments
                // from getting cached with the page itself. Remove once Chrome bug #94369
                // has been resolved as fixed.
                var fetch_href = href;
                if (navigator.userAgent.indexOf('Chrome') > -1) {
                    fetch_href += (href.indexOf("?") > -1 ? '&' : '?') + 'frag';
                }

                $.get(fetch_href, function(d, textStatus, xhr) {
                    // Bail if this is not HTML.
                    if (xhr.getResponseHeader('content-type').indexOf('text/html') < 0) {
                        window.location = href;
                        return;
                    }
                    console.log('caching fragment');
                    fragmentCache[href] = d;
                    updateContent(d, href, popped, {scrollTop: state.scrollTop});
                }).error(function() {
                    window.location = href;
                });
            }

        }