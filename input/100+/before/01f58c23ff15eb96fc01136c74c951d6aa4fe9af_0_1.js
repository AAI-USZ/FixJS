function (err, ver) {
        if (!err && ver) {
            if (ver !== state.pkg.version) {
                con.info('You are using mole v' + state.pkg.version + '; the latest version is v' + ver);
                con.info('Use "sudo npm -g update mole" to upgrade');
            } else {
                con.ok('You are using the latest version of mole');
            }
        }
    }