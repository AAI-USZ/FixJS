function(options) {
        options.method = 'POST';
        Ext.Ajax.request(Ext.apply({
            headers: {
                'X-CSRFToken': LU.Util.getCsrfToken(options)
            }
        }, options));
    }