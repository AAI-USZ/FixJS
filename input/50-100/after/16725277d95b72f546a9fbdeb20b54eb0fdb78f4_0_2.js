function() {
        clearAbortTimer();
        if (fileBuffer === null) {
            errorFinish();
        } else {
            try {
                var newbuf = new Buffer(fileBuffer).slice(0, fileWritten);
                callback(originalUrl, newbuf, statusCode, mimeType);
            } catch (e) {
                options.logger.error("assetDownloadFinish", e);
                errorFinish();
            }
        }
    }