function (cb) {
    var that = this,
        path = '/makelint',
        req;
    that.log('Regenerating lint results...');
    req = http.request({ path: path, method: 'POST'}, function (res) {
        res.on('end', function () {
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
    req.end();
}