function init(opts) {
    con.enableTimestamps();
    if (opts.debug) {
        con.enableDebug();
    }

    verifyDependencies();

    moleDir = path.resolve(opts.store);

    dataDir = path.join(moleDir, 'data');
    con.debug('Creating data directory ' + dataDir);
    mkdirp.sync(dataDir);

    certDir = path.join(moleDir, 'crt');
    con.debug('Creating cert directory ' + certDir);
    mkdirp.sync(certDir);

    extraDir = path.join(moleDir, 'extra');
    con.debug('Creating extra directory ' + extraDir);
    mkdirp.sync(extraDir);

    scriptDir = path.join(__dirname, '..', 'script');

    var userFile = path.join(moleDir, 'users.json');
    con.debug('Using users file', userFile);
    users = new userStore(userFile);

    caCertFile = path.join(moleDir, 'ca-cert.pem');
    serverCertFile = path.join(certDir, 'server-cert.pem');
    serverKeyFile = path.join(certDir, 'server-key.pem');

    con.debug('Chdir to ' + moleDir);
    process.chdir(moleDir);

    con.debug('Checking for existing certificates');
    if (!fs.existsSync(caCertFile)) {
        con.info('Generating new CA certificate');
        con.debug(path.join(scriptDir, 'gen-ca.exp'));
        spawn(path.join(scriptDir, 'gen-ca.exp')).on('exit', function (code) {
            if (code !== 0) {
                con.fatal('Error ' + code);
            }
            con.ok('Generated CA certificate');

            con.info('Generating new server certificate');
            spawn(path.join(scriptDir, 'gen-user.exp'), [ 'server' ]).on('exit', function (code) {
                if (code !== 0) {
                    con.fatal('Error ' + code);
                }
                con.ok('Generated server certificate');

                startApp(opts);
            });
        });
    } else {
        startApp(opts);
    }
}