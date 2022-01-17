function (err) {
                assert.deepEqual(err[0].message, "Migration error : Missing migration for 1");
                next();
            }