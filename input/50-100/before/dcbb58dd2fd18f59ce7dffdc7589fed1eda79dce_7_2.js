function () {
        var ti = that.typeInfo,
            req = http.request(
                { method: 'DELETE',
                    path: '/package/' + ti.factory + '/visual/' + ti.type },
                function (res) {
                    res.on('error', function (e) {
                        alert('Error deleting');
                    });
                }
            );
        req.end();
    }