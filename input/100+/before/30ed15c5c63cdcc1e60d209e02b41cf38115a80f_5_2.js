function platform(command, target) {
    var projectRoot = cordova_util.isCordova(process.cwd());

    if (!projectRoot) {
        console.error('Current working directory is not a Cordova-based project.');
        return;
    }
    if (arguments.length === 0) command = 'ls';

    var xml = path.join(projectRoot, 'www', 'config.xml');
    var cfg = new config_parser(xml);

    switch(command) {
        case 'ls':
            var platforms = cfg.ls_platforms();
            if (platforms.length) {
                platforms.map(function(p) {
                    console.log(p);
                });
            } else console.log('No platforms added. Use `cordova platform add <platform>`.');
            break;
        case 'add':
            // Add the platform to the config.xml
            cfg.add_platform(target);

            var output = path.join(projectRoot, 'platforms', target);

            // Do we have the cordova library for this platform?
            if (!cordova_util.havePlatformLib(target)) {
                // Shell out to git.
                var outPath = path.join(__dirname, '..', 'lib', target);
                var cmd = util.format('git clone %s %s', repos[target], outPath);
                console.log('Cloning ' + repos[target] + ', this may take a while...');
                exec(cmd, function(err, stderr, stdout) {
                    if (err) {
                        console.error('An error occured during git-clone of ' + repos[target] + ', ', err);
                        cfg.remove_platform(target);
                        return;
                    }
                    create(target, output, cfg);
                });
            } else {
                create(target, output, cfg);
            }
            break;
        case 'remove':
            // Remove the platform from the config.xml
            cfg.remove_platform(target);

            // Remove the Cordova project for the platform.
            try {
                rmrf(path.join(projectRoot, 'platforms', target));
            } catch(e) {}
            break;
        default:
            console.error('Unrecognized command "' + command + '". Use either `add`, `remove`, or `ls`.');
            break;
    }
}