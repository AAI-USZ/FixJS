function (err, dbs) {
            if (err) {
                return callback('Failed to update app list\n' + err);
            }
            var completed = 0;
            async.forEachSeries(dbs, function (db, cb) {
                exports.refreshDB(db, function (err) {
                    if (err) {
                        return cb(err);
                    }
                    completed++;
                    ev.emit(
                        'progress',
                        Math.floor(completed / dbs.length * 100)
                    );
                    cb();
                });
            },
            function (err) {
                if (err) {
                    return callback(err);
                }
                exports.saveLocal();
                callback();
            });
        }