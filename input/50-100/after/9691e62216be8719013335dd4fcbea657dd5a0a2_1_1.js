function(buffer, contentType, httpStatusCode) {
                try {
                    response.writeHead(httpStatusCode, {
                        'Content-Type': contentType,
                        'Content-Length': buffer.length,
                        'Cache-Control': 'max-age=2592000' //30 days
                    });
                    options.stats.dataCount[request.connection.remoteAddress] += buffer.length;
                    response.end(buffer, 'binary');
                    options.logger.access(request, httpStatusCode, buffer.length);
                } catch (e) {
                    // client missing or something
                    console.error("assetDownload", e);
                }
            }