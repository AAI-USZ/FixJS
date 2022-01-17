function(error, res, more) {
            equal(error, null);
            equal(res.length, 10);
            equal(more, false);
            barrier();
        }