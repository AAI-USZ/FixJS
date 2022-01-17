function (_settings, args, commands) {
    var a = argParse(args, {
        'repository': {match: ['-r', '--repository'], value: true},
        'target_dir': {match: ['-d', '--package-dir'], value: true}
    });

    var opt = a.options;
    opt.target_dir = opt.target_dir || _settings.package_dir;

    opt.repositories = _settings.repositories;
    if (a.options.repository) {
        opt.repositories = [a.options.repository];
        // don't allow package dir .jamrc file to overwrite repositories
        opt.fixed_repositories = true;
    }

    project.load(opt.target_dir, function (err, meta) {
        if (err) {
            return logger.error(err);
        }

        // list current locks
        if (a.positional.length < 1) {
            for (var name in meta.dependencies) {
                if (meta.dependencies[name]) {
                    console.log(name + '@' + meta.dependencies[name]);
                }
            }
            logger.clean_exit = true;
            return;
        }

        async.map(a.positional, function (name, cb) {
            var range = null;
            if (!range && name.indexOf('@') !== -1) {
                var parts = name.split('@');
                name = parts[0];
                range = parts.slice(1).join('@');
            }
            if (!(name in meta.dependencies)) {
                return cb(new Error('Package not found: "' + name + '"'));
            }
            if (!range) {
                // use current version
                var pkgdir = path.resolve(opt.target_dir, name);
                settings.load(pkgdir, function (err, cfg) {
                    if (err) {
                        return cb(err);
                    }
                    cb(null, {name: cfg.name, range: cfg.version});
                });
            }
            else {
                cb(null, {name: name, range: range});
            }
        },
        function (err, results) {
            if (err) {
                return logger.error(err);
            }
            results.forEach(function (r) {
                meta.dependencies[r.name] = r.range;
            });
            install.reinstallPackages(meta, opt, function (err) {
                if (err) {
                    return logger.error(err);
                }
                logger.end();
            });
        });
    });
}