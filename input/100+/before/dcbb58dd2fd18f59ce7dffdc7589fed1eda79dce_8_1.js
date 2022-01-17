function (cb) {
    var data = '',
        that = this,
        path = '/package';
    http.get({ path: path}, function (res) {
        res.on('data', function (d) {
            data += d;
        });
        res.on('end', function () {
            var jsonData = JSON.parse(data);
            that.packages = jsonData;
            if (cb) {
                cb(null);
            }
        });
        res.on('error', function (e) {
            if (cb) {
                cb(e);
            }
        });
    });
}