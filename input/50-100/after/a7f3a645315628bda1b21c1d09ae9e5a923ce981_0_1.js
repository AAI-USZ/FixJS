function (err, c_result) {
            if (c_result && env.cache_control != 'no-cache') {
                result = c_result;
                f['return']();
            } else {
                try {
                    to_cache(function (val) {
                        mc.set(key, val, tm_out, function (err, c_result) {
                            result = val;
                            f['return']();
                        });
                    });
                } catch (e) {
                    err_result = e;
                    result = '';
                    f['return']();
                }
            }
        }