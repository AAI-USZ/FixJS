function() {
            // Check for url param, path and if user is logged in
            if ($.deparam.querystring().url && checkValidRedirect($.deparam.querystring().url) &&
                !sakai.api.User.isAnonymous(sakai.data.me) &&
                (window.location.pathname === '/' || window.location.pathname === '/dev/explore.html' ||
                  window.location.pathname === '/index' || window.location.pathname === '/dev')) {
                    window.location = $.deparam.querystring().url;
            }
        }