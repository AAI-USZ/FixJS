function () {
        var name = getNewModuleName(),
            packageName = that.selected,
            // we should validate and strip unwanted stuff
            req;
        if (name && packageName) {
            req = http.request(
                {
                    method: 'PUT',
                    path: '/package/' + packageName + '/visual/' + name
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
            alert('error');
        }
    }