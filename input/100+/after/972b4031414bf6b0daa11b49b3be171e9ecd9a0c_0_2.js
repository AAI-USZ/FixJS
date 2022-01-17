function constructUrl(req) {
    var host = req.headers.host,
        encrypted = req.connection.encrypted,
        hasPort = host.indexOf(':') >= 0,
        port = (hasPort) ? '' : encrypted ? ':443' : ':80';

    return 'http' + (encrypted ? 's://' : '://') + host + port;
}