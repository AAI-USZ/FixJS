function (req_opts, cb) {
    var memcached = req_opts.memcached;
    var timeout = req_opts.timeout;

    var base_key = 'kumascript:request:' + ks_utils.md5(req_opts.url);
    var key = function (name) { return base_key + ':' + name; }

    var ua_cc = parseCacheControl(req_opts['cache_control'] || '');
    var max_age = 0;
    if (!_.isUndefined(ua_cc['no-cache'])) {
        max_age = 0;
    } else if (!_.isUndefined(ua_cc['max-age'])){
        max_age = parseInt(ua_cc['max-age']);
    }
    
    memcached.get(key('cached_at'), function (err, cached_at) {

        // Handle a cache entry younger than max-age as an implicit 304
        var now = (new Date()).getTime();
        var age = (now - parseInt(cached_at)) / 1000;
        if (age < max_age) {
            return handle304(memcached, key, null, cb);
        }

        // Otherwise, issue a conditional GET request using the cached
        // last-modified time.
        memcached.get(key('last_mod'), function (err, last_mod) {
            try {
                req_opts.headers = buildHeaders(req_opts.cache_control, last_mod);
                request(req_opts, function (err, resp, source) {
                    if (err) {
                        cb(err, null);
                    } else if (304 == resp.statusCode) {
                        handle304(memcached, key, resp, cb);
                    } else if (200 == resp.statusCode) {
                        handle200(memcached, key, timeout, resp, source, cb);
                    } else {
                        cb("status " + resp.statusCode, null, null, false);
                    }
                });
            } catch(e) {
                cb(e, null, null, false);
            }
        });

    });
}