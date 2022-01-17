function (req, res, options, response_cb) {
        var $this = this;

        // Shortcircuit on unsupported request methods
        var method = req.method.toUpperCase(),
            supported_methods = $this.methods;
        if (supported_methods.indexOf(method) === -1) {
            return $this.revalidate(null, {}, req, res, null, response_cb);
        }
        
        // Start building a cache key with the URL path.
        var cache_key_parts = [
            url.parse(req.url).pathname
        ];

        // Include the values of request headers specified in the Vary:
        // response header.
        var vary_names = (''+res.header('vary')).split(',')
                            .map(function (name) {
                                return name.trim().toLowerCase();
                            });
        vary_names.sort();
        vary_names.forEach(function (name) {
            cache_key_parts.push(name + ': ' + req.header(name));
        });

        // Build a cache key based on all the parts.
        var cache_key = 'response-cache:' + crypto.createHash('sha1')
            .update(cache_key_parts.join('|')).digest('hex');
         
        // Handy for diagnostics, maybe not needed
        res.header('X-Cache-Key', cache_key);

        var ua_cc = parseCacheControl(req.headers['cache-control'] || '');
        var ims = req.header('if-modified-since');

        var opts = {
            if_none_match: req.header('if-none-match'),
            if_modified_since: ims ?
                (new Date(ims)).getTime() : null,
            no_cache: !_.isUndefined(ua_cc['no-cache']),
            max_age: _.isUndefined(ua_cc['max-age']) ?
                $this.options.max_age : ua_cc['max-age']
        };

        var s_pre = 'kumascript.response_caching.';
        if (opts.no_cache) {
            $this.statsd.increment(s_pre + 'no_cache');
        }
        if (opts.max_age == 0) {
            $this.statsd.increment(s_pre + 'max_age_zero');
        }

        $this.get(cache_key, opts, function (err, headers, body, meta) {
            if (err == $this.ERR_MISS || err == $this.ERR_STALE) {
                $this.statsd.increment(s_pre + 'miss');
                return $this.revalidate(cache_key, opts, req, res, err, response_cb);
            } else if (err == $this.ERR_NOT_MODIFIED) {
                $this.statsd.increment(s_pre + 'not_modified');
                return $this.sendNotModified(req, res, meta);
            } else {
                $this.statsd.increment(s_pre + 'hit');
                return $this.sendCacheEntry(cache_key, req, res, headers, body, meta);
            }
        });
    }