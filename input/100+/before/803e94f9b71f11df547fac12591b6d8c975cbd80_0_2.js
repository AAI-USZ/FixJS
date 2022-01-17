function (err, data) {
            if (err) {
                return callback(
                    'Failed to update apps from DB: ' + db + '\n' + err
                );
            }
            // do in series otherwise chrome likes to cancel the ajax
            // calls with status 0
            async.forEachSeries(data.rows || [], function (r, cb) {
                var ddoc_url = ['', db, r.id].join('/');

                if (!exports.exists(ddoc_url, r.value.rev)) {
                    // does not exist at this revision, update
                    exports.refreshDoc(ddoc_url, cb);
                }
                else {
                    console.log(['skip', ddoc_url]);
                    cb();
                }
            },
            callback);
        }