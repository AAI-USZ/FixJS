function (err, last_mod) {
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
                        cb("status " + resp.statusCode, null, null);
                    }
                });
            } catch(e) {
                cb(e, null, null);
            }
        }