function (err) {
                assert.deepEqual(err.message, "Migration error : Duplicate migration number 0");
                next();
            }