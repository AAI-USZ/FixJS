function(success, data) {
            sakai.api.Util.startup(data);
            // Start i18n
            sakai.api.i18n.init(data);
        }