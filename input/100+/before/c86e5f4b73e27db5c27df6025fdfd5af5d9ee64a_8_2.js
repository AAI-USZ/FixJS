function install() {
    var what = args.shift(), where = args.shift();
    if (!what || !what.match(/\.git$/)) {
        console.log('What do you want to install?');
        return true;
    }

    if (!where) {
        var m = what.match(/\/([^\/]*?)\.git/);
        where = m[1];
    }

    if (!path.existsSync(app.root + '/node_modules')) {
        fs.mkdirSync(app.root + '/node_modules');
    }

    var command = 'clone';
    if (path.existsSync(app.root + '/.git')) {
        command = 'submodule add';
    }

    console.log('Installing ' + where + ' extension from ' + what + ' repo to node_modules/' + where);

    var cp = require('child_process');
    cp.exec('git ' + command + ' ' + what + ' node_modules/' + where, function () {
        if (path.existsSync(app.root + '/npmfile.coffee')) {
            cp.exec('echo "require \'' + where + '\'" >> npmfile.coffee');
            console.log('Patched npmfile.coffee');
        } else {
            cp.exec('echo "require(\'' + where + '\');" >> npmfile.js');
            console.log('Patched npmfile.js');
        }
        var installScript = app.root + '/node_modules/' + where + '/install.js';
        if (path.existsSync(installScript)) {
            console.log('Running installation script');
            require(installScript);
        } else {
            process.exit(0);
        }
    });
    return false;
}