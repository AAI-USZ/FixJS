function (err, resp, source, cache_hit) {
            if (err) {
                cb(err, null, false);
            } else {
                $this.compile(source, cb, cache_hit);
            }
        }