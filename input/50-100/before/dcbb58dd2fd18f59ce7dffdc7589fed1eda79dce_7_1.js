function () {
        var ti = that.typeInfo,
            req = http.request(
                { method: 'POST', path: '/monitor/' + ti.factory + '.' + ti.type},
                function (res) {
                    res.on('error', function (e) {
                        alert('Error setting monitored application');
                    });
                }
            );
        req.end();
    }