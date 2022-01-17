function(error, res, more) {
            equal(error, null);
            if (res)
                equal(res.length, 10)
            else
                ok(!!res);
            
            equal(more, false);
            barrier();
        }