function(res) {
        if (res.statusCode >= 300 && res.statusCode < 400) {
            url = getUrl(res.headers.location);
            if (originalUrl == url) {
                console.error("endless redirect detected...");
                errorFinish(404);
            } else if (!hasSaneConditions()) {
                errorFinish(404);
            } else if (redirects < maxRedirects) {
                var newHost = getHostname(url);

                if (newHost) {
                    mirrors = [newHost];
                }

                options.stats.redirects++;
                redirects++;
                fetchFileAndFinish();
            } else {
                console.error("aborting asset request because of too many redirects");
                soupRequest.abort();
                errorFinish(404);
            }
        } else {
            res.setEncoding('binary');
            var contentLength = parseInt(res.headers['content-length']);
            fileSize = contentLength;
            mimeType = res.headers['content-type'] ? res.headers['content-type'] : null;
            statusCode = res.statusCode;
            res.on('error', onError);
            res.on('data', onFileData);
            res.on('end', onFileEnd);
        }
    }