function () {
        var name = getNewPackageName(),
            // we should validate and strip unwanted stuff
            req;
        if (name) {
            req = http.request(
                {
                    method: 'PUT',
                    path: '/swallow/package/' + name
                },
                function (res) {
                    res.on('error', function (e) {
                        alert('Error saving');
                    });
                    res.on('end', function () {
                    });
                }
            );
            req.end();
        } else {
            alert('invalid name ' + name);
        }
    }