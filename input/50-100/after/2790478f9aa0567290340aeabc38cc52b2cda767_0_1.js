function (err, resp, source) {
                    if (err) {
                        cb(err, null);
                    } else if (304 == resp.statusCode) {
                        handle304(memcached, key, resp, cb);
                    } else if (200 == resp.statusCode) {
                        handle200(memcached, key, timeout, resp, source, cb);
                    } else {
                        cb("status " + resp.statusCode, null, null, false);
                    }
                }