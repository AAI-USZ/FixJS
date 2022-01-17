function(err) {
                    if (err) {
                        console.error(err.message);
                        console.error(err.stack);
                    } else {
                        cacheSize++;
                        updateStats();
                    }
                }