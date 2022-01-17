function(err) {
                    if (err) {
                        options.logger.error('cacheInsert ' + url, err);
                    } else {
                        cacheSize++;
                        updateStats();
                    }
                }