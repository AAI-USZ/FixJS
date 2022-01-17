function (key, tm_out, to_cache) {
        var result = null,
            f = new Future(),
            env = this.env,
            mc = this.memcached;
        mc.get(key, function (err, c_result) {
            if (c_result && env.cache_control != 'no-cache') {
                result = c_result;
                f['return']();
            } else {
                to_cache(function (val) {
                    mc.set(key, val, tm_out, function (err, c_result) {
                        result = val;
                        f['return']();
                    });
                });
            }
        });
        f.wait();
        return result;
    }