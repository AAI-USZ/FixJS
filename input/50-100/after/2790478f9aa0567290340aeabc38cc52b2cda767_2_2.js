function _q_next (cache_hit) {
                    $this.emit('templateLoadEnd', {
                        name: name, duration: new Date() - ts,
                        cache_hit: cache_hit
                    });
                    q_next();
                }