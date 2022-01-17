function (_settings, args, commands) {
    var a = argParse(args, {
        'repository': {match: ['-r', '--repository'], value: true},
        'target_dir': {match: ['-d', '--package-dir'], value: true}
    });

    var opt = a.options;
    opt.target_dir = opt.target_dir || './jam';

    opt.repositories = _settings.repositories;
    if (a.options.repository) {
        opt.repositories = [a.options.repository];
        // don't allow package dir .jamrc file to overwrite repositories
        opt.fixed_repositories = true;
    }

    if (a.positional.length < 1) {
        console.log(exports.usage);
        logger.clean_exit = true;
        return;
    }
    var pkg = a.positional[0];

    project.load(opt.target_dir, function (err, meta) {
        if (err) {
            return logger.error(err);
        }
        settings.load(pkg, function (err, cfg) {
            if (err) {
                return logger.error(err);
            }

            meta.dependencies[cfg.name] = 'linked';
            var newpath = path.resolve(opt.target_dir, cfg.name);
            exports.createLink(path.resolve(pkg), newpath, function (err) {
                if (err) {
                    return logger.error(err);
                }
                install.reinstallPackages(meta, opt, function (err) {
                    if (err) {
                        return logger.error(err);
                    }
                    project.updateRequireConfig(
                        opt.target_dir,
                        local,
                        function (err) {
                            if (err) {
                                return logger.error(err);
                            }
                            logger.end();
                        }
                    );
                });
            });

        });
    });

}