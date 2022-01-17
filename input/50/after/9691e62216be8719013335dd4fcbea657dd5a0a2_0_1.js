function(status) {
        status = status || 500;
        options.logger.error("errorFinish(" + status + ") " + originalUrl);
        var newbuf = new Buffer(0);
        callback(originalUrl, newbuf, status);
    }