function(filepath, contents, force, callback, errorHandler, handler409) {
        debug.info("model.setFile");
        debug.info("force")
        debug.info(force)
        debug.info('handler409')
        debug.info(handler409)
        jQuery.ajax({
            type: 'POST',
            url:  'file/'+filepath.replace(/\\/g,'/'),
            data: { 'contents': contents, 'force': force },
            success: function(text) {
                        if (typeof callback === 'function') {
                            callback(text);
                        }
                     },
            error: errorHandler,
            statusCode: {
                409: handler409
             },
        });
    }