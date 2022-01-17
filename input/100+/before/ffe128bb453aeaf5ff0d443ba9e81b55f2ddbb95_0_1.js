function (err, headers, body, meta) {
            if (err == $this.ERR_MISS || err == $this.ERR_STALE) {
                return $this.revalidate(cache_key, opts, req, res, err, response_cb);
            } else if (err == $this.ERR_NOT_MODIFIED) {
                return $this.sendNotModified(req, res, meta);
            } else {
                return $this.sendCacheEntry(cache_key, req, res, headers, body, meta);
            }
        }