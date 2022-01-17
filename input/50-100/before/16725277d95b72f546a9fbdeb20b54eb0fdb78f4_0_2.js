function() {
        clearAbortTimer();
        if (fileBuffer === null) {
            errorFinish();
        } else {
            try {
                var newbuf = new Buffer(fileBuffer).slice(0, fileWritten);
                callback(originalUrl, newbuf, statusCode, mimeType);
            } catch (e) {
                console.error(e.message);
                console.error(e.stack);
                errorFinish();
            }
        }
    }