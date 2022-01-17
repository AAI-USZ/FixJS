function() {
                      my.ee.emit('retry', c + 1, err);
                      retry(c + 1);
                    }