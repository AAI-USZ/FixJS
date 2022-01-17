function (err, result) {
        // TODO: Seems like we need this to preserve UTF-8 in cache... really?
        var source = (!result) ? '' :
            (new Buffer(result, 'base64')).toString('utf-8');
        cb(null, resp, source, true);
    }