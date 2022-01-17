function (err) {
            if (err) {
                return cb(err);
            }
            ncp(path.resolve(source), dest, cb);
        }