function () {
    var that = this,
        req = http.request(
            { method: 'POST', path: '/swallow/makehelp' },
            function (res) {
                res.on('end', function (e) {
                    that.showPackages();
                });
            }
        );
    req.end();

}