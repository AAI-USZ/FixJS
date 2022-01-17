function($, sakai) {
        if (document.location.pathname !== "/tests/qunit/" && document.location.pathname !== "/tests/qunit/index.html") {
            sakai.api.User.loadMeData(function(success, data) {
                // Start i18n
                sakai.api.i18n.init(data);
            });
        }
        return sakai;
    }