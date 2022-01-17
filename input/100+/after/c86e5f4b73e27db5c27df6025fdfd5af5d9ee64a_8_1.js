function () {
        if (railway.utils.existsSync(app.root + '/npmfile.coffee')) {
            cp.exec('echo "require \'' + where + '\'" >> npmfile.coffee');
            console.log('Patched npmfile.coffee');
        } else {
            cp.exec('echo "require(\'' + where + '\');" >> npmfile.js');
            console.log('Patched npmfile.js');
        }
        var installScript = app.root + '/node_modules/' + where + '/install.js';
        if (railway.utils.existsSync(installScript)) {
            console.log('Running installation script');
            require(installScript);
        } else {
            process.exit(0);
        }
    }