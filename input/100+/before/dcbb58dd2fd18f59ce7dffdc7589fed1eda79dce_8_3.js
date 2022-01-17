function (p, name) {
        var data = '',
            path = '/make/' + name + '/' + name + '.lint.json';
        toLoad += 1;
        http.get(
            { path: path},
            function (res) {
                res.on('data', function (d) {
                    data += d;
                });
                res.on('end', function () {
                    lintRes[name] = JSON.parse(data);
                    loaded();
                });
                res.on('error', function () {
                    loaded();
                });
            }
        );
    }