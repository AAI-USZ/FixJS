function (options) {
    options = options || {};
    var express = require('express');
    var server;
    if (express.createServer) {
        server = express.createServer;
    } else {
        server = express;
    }

    var keys, app,
        key = options.key || process.cwd() + '/config/tsl.key',
        cert = options.cert || process.cwd() + '/config/tsl.cert';

    if (railway.utils.existsSync(key) && railway.utils.existsSync(cert)) {
        keys = {
            key: fs.readFileSync(key).toString('utf8'),
            cert: fs.readFileSync(cert).toString('utf8')
        };
    }

    if (keys) {
        app = server(keys);
    } else {
        app = server();
    }

    exports.init(app);

    return app;
}