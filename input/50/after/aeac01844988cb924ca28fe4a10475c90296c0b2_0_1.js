function (err) {
                assert.deepEqual(err.message, "Migration error : Missing migration for 1");
                next();
            }