function() {
                    cacheHandler.insertFileBuffer(url, buffer, mimeType, function(err) {
                        if (!err) {
                            options.eventBus.emit('newAsset', url, buffer, mimeType);
                            downloadCount++;
                        }
                    });
                }