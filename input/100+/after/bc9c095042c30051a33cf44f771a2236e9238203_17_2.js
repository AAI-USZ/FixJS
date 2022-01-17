function() {
            var redirectURL = window.location.pathname + window.location.search + window.location.hash;
            // Check whether we require a redirect
            if ($.deparam.querystring().url) {
                // Check if the redirect URL is valid
                if (checkValidRedirect($.deparam.querystring().url)) {
                    redirectURL = $.deparam.querystring().url;
                } else {
                    redirectURL = window.location.pathname;
                }
            // Go to You when you're on explore page
            } else if (window.location.pathname === '/dev/explore.html' || window.location.pathname === '/register' ||
                window.location.pathname === '/index' || window.location.pathname === '/' || window.location.pathname === '/dev') {
                redirectURL = '/me';
            // 500 not logged in
            } else if (sakai_global.nopermissions && sakai.data.me.user.anon && sakai_global.nopermissions.error500) {
                redirectURL = '/me';
            }
            return redirectURL;
        }