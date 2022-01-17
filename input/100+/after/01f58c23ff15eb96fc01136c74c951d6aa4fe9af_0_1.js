function version(opts, state) {
    con.info('Client: mole v' + state.pkg.version);

    libversion.fetch('mole', function (err, ver) {
        con.info('Latest: mole v' + ver);
        if (!err && ver) {
            if (ver !== state.pkg.version) {
                con.info('Use "sudo npm -g update mole" to upgrade');
            } else {
                con.ok('You are using the latest version of mole');
            }
        }
    });

    state.client.getPkg(function (pkg) {
        con.info('Server: mole v' + pkg.version);
    });
}