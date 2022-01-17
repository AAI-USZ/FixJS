function (config, callback) {
    var missing = [];
    var ipMap = {};
    var ips;

    if (!intf) {
        return callback(false);
    }

    function addIp(ip, callback) {
        con.info('Adding local IP ' + ip + ' for forwards; if asked for password, give your local (sudo) password.');
        var ifconfig = spawn('sudo', ['ifconfig', intf, 'add', ip], { customFds: [0, 1, 2] });
        ifconfig.on('exit', callback);
    }

    function addMissingIps(exitCode) {
        if (exitCode === 0 && missing.length > 0) {
            addIp(missing.shift(), addMissingIps);
        } else {
            callback(exitCode === 0);
        }
    }

    var allForwards = _.flatten(_.values(config.forwards).concat(_.values(config.localForwards)));
    allForwards.forEach(function (f) {
        var m = f.from.match(/^([0-9.]+):/);
        if (m) {
            ipMap[m[1]] = true;
        }
    });
    ips = _.keys(ipMap);

    exec('ifconfig ' + intf, function (error, stdout, stderr) {
        ips.forEach(function (ip) {
            if (!stdout.match(new RegExp('\\s' + ip.replace('.', '\\.') + '\\s'))) {
                missing.push(ip);
            }
        });

        addMissingIps(0);
    });
}