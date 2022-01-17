function (val) {
                    mc.set(key, val, tm_out, function (err, c_result) {
                        result = val;
                        f['return']();
                    });
                }