function saveIniTunnel(config, name) {
    var ini = new inireader.IniReader();
    ini.param('general', { description: config.description, author: config.author });
    if (config.main) { ini.param('main', config.main ) };

    _.each(config.hosts, function (host, name) {
        if (host.key) {
            // The ini format doesn't handle multiline strings, so we replace newlines with spaces in ssh keys.
            host = _.clone(host);
            host.key = host.key.replace(/\n/g, ' ');
        }
        ini.param('host ' + name, host);
    });

    _.each(config.forwards, function (fwd, name) {
        var obj = {};
        fwd.forEach(function (f) {
            obj[f.from] = f.to;
        });
        ini.param('forward ' + name, obj);
    });

    _.each(config.localForwards, function (fwd, name) {
        var obj = {};
        fwd.forEach(function (f) {
            obj[f.from] = f.to;
        });
        ini.param('localforward ' + name, obj);
    });

    if (config.vpnc) { ini.param('vpnc', config.vpnc); }
    if (config.vpnRoutes) { ini.param('vpn routes', config.vpnRoutes); }

    ini.write(name);
}