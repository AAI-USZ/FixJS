function (settings, args) {
    var a = argParse(args, {
        'target_dir': {match: ['-d', '--package-dir'], value: true}
        // TODO 'clean':      {match: '--clean'}
    });

    if (a.positional.length < 1) {
        console.log(exports.usage);
        logger.clean_exit = true;
        return;
    }

    var opt = a.options;
    opt.target_dir = opt.target_dir || path.resolve(settings.package_dir);

    install.initDir(opt, function (err, opt, cfg) {
        if (err) {
            return callback(err);
        }
        async.map(
            a.positional,
            async.apply(exports.remove, cfg, opt),
            function (err) {
                if (err) {
                    return logger.error(err);
                }
                exports.reportUnused(settings, cfg, opt, function (err, packages) {
                    if (err) {
                        return logger.error(err);
                    }
                    project.writeMeta(opt.target_dir, cfg, function (err, cfg) {
                        if (err) {
                            return callback(err);
                        }
                        project.updateRequireConfig(opt.target_dir, packages,
                           function (err) {
                                if (err) {
                                    return logger.error(err);
                                }
                                logger.end();
                           }
                        );
                    });
                });
            }
        );
    });
}