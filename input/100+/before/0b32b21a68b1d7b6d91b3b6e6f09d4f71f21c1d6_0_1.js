function(args) {

    var client, options;
    var uri, heirpart, authority, host, port, path, useProxy = false, proxyHost, proxyPort;

    var isTls = args.uri.indexOf('https://') == 0;
    uri = new URI(args.uri, false);

    heirpart = uri.heirpart();
    assert.ok(heirpart, 'URI [' + args.uri + '] is invalid');
    authority = heirpart.authority();
    assert.ok(authority, 'URI [' + args.uri  + '] is invalid');
    host = authority.host();
    assert.ok(host, 'Host of URI [' + args.uri  + '] is invalid');
    port = authority.port() || (isTls ? 443 : 80);
    assert.ok(port, 'Port of URI [' + args.uri  + '] is invalid');
    path = (heirpart.path().value || '') + (uri.querystring() || '');

    assert.ok(args.name, 'table name not specified');

    if(args.config.proxy) {
        var proxyConfig = args.config.proxy;
        if (proxyConfig[host] && !proxyConfig[host].host) {
            useProxy = false;
        }
        else if (proxyConfig[host] && proxyConfig[host].host) {
            proxyHost = proxyConfig[host].host;
            proxyPort = proxyConfig[host].port;
            useProxy = true;
        }
        else if (proxyConfig['*']) {
            proxyHost = proxyConfig['*'].host;
            proxyPort = proxyConfig['*'].port;
            useProxy = true;
        }
    }

    options = {
        host: useProxy ? proxyHost : host,
        port: useProxy? proxyPort : port,
        path: useProxy? uri.scheme() + '//' + host + path : path,
        method: args.method,
        headers: args.headers
    };
    client = isTls ? https : http;

    // Send
    sendMessage(args, client, options, 0);
}