function (err, source) {
                    if (!source || err) {
                        return cb(err, null, false);
                    }
                    $this.cache_store(name, source, function (err) {
                        return $this.compile(source, cb, false);
                    });
                }