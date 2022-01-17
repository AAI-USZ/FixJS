function (exists) {
        if (exists) {
            t.ok(true, 'image ' + uuid + ' exists');
            callback();
        } else {
            vmtest.getImage(t, uuid, function (err) {
                if (err) {
                    t.ok(false, 'failed downloading image ' + uuid + ': '
                        + err.message);
                    callback(err);
                } else {
                    t.ok(true, 'downloaded image ' + uuid);
                    path.exists(checkpath, function (exists) {
                        t.ok(exists, 'now have image ' + uuid);
                        if (exists) {
                            callback();
                        } else {
                            callback(new Error('unable to download image '
                                + uuid));
                        }
                    });
                }
            });
        }
    }