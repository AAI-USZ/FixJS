function create(target, dir, cfg, callback) {
    // Check if it already exists.
    try {
        fs.lstatSync(dir);
    } catch(e) {
        // Doesn't exist, continue.
        var bin = path.join(__dirname, '..', 'lib', target, 'bin', 'create');
        var pkg = cfg.packageName();
        var name = cfg.name().replace(/\W/g,'_');
        var cmd = util.format('%s "%s" "%s" "%s"', bin, dir, pkg, name);
        exec(cmd, function(err, stderr, stdout) {
            if (err) {
                cfg.remove_platform(target);
                throw 'An error occured during creation of ' + target + ' sub-project. ' + err;
            } else if (callback) callback();
        });
    }
}