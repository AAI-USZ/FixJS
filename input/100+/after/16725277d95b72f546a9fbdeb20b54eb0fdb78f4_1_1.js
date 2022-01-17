function(err, mimeType) {
            for (var i in callbacks[url]) {
                callbacks[url][i](buffer, err ? 'text/html' : mimeType, httpStatusCode);
                servedCount++;
            }

            delete callbacks[url];
            delete activeDownloads[url];

            if (err) {
                options.logger.error("requesting mime type", err);
            }

            if (err ||
                    mimeType.search(/application/) != -1 ||
                    mimeType.search(/text/) != -1 ||
                    httpStatusCode < 200 ||
                    httpStatusCode >= 300) {
                soupErrors++;
            } else {
                process.nextTick(function() {
                    cacheHandler.insertFileBuffer(url, buffer, mimeType, function(err) {
                        if (!err) {
                            options.eventBus.emit('newAsset', url, buffer, mimeType);
                            downloadCount++;
                        }
                    });
                });
            }
        }