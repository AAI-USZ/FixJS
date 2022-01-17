function(status) {
        status = status || 500;
        console.error(new Date());
        console.error("errorFinish(" + status + ")");
        console.trace();
        var newbuf = new Buffer(0);
        callback(originalUrl, newbuf, status);
    }