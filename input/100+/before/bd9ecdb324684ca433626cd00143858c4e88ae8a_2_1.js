function (settings, args) {
    var a = argParse(args, {
        'repository': {match: ['-r', '--repository'], value: true},
        'target_dir': {match: ['-d', '--package-dir'], value: true}
    });

    var opt = a.options;
    var names = a.positional;

    opt.repositories = settings.repositories;
    if (a.options.repository) {
        opt.repositories = [a.options.repository];
        // don't allow package dir .jamrc file to overwrite repositories
        opt.fixed_repositories = true;
    }

    opt.target_dir = opt.target_dir || path.resolve('jam');

    exports.initDir(opt, function (err, opt, cfg) {
        if (err) {
            return callback(err);
        }
        if (names.length < 1) {
            exports.reinstallPackages(cfg, opt, function (err) {
                if (err) {
                    return logger.error(err);
                }
                logger.end();
            });
        }
        else {
            exports.installPackages(cfg, names, opt, function (err) {
                if (err) {
                    return logger.error(err);
                }
                logger.end();
            });
        }
    });
}