function (exists) {
            if (!exists) {
                return cb(path.resolve(source) + ' does not exist');
            }
            mkdirp(path.dirname(dest), function (err) {
                if (err) {
                    return cb(err);
                }
                ncp(path.resolve(source), dest, cb);
            });
        }