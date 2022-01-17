function create (dir) {
        if (dir && (dir[0] == '~' || dir[0] == '/')) {
        } else {
            dir = dir ? path.join(process.cwd(), dir) : process.cwd();
        }

        // Check for existing cordova project
        try {
            if (fs.lstatSync(path.join(dir, '.cordova')).isDirectory()) {
                console.error('Cordova project already exists at ' + dir + ', aborting.');
                return;
            }
        } catch(e) { /* no dirs, we're fine */ }

        // Create basic project structure.
        mkdirp(path.join(dir, '.cordova'));
        mkdirp(path.join(dir, 'platforms'));
        mkdirp(path.join(dir, 'plugins'));
        mkdirp(path.join(dir, 'www'));

        // Copy in base template
        ncp(path.join(__dirname, 'templates', 'www'), path.join(dir, 'www'), function(err) {
            if (err) return console.error(err);
        });
    }