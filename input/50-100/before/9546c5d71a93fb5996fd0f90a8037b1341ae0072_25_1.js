function(doc) {
            if (document.location.pathname !== "/tests/qunit/" && document.location.pathname.indexOf("/tests/qunit/index.html") === -1) {
                sakai.api.User.loadMeData(function(success, data) {
                    // Start i18n
                    sakai.api.i18n.init(data);
                });
            }
        }