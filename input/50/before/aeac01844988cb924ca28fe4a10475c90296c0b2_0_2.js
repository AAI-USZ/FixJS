function (err) {
                assert.deepEqual(err[0].message, "Migration error : Duplicate migration number 0");
                next();
            }