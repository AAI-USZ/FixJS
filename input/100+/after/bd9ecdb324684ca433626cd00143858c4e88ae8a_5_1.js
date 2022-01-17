function (settings, args) {
    var a = argParse(args, {
        'target_dir': {match: ['-d', '--package-dir'], value: true}
    });

    var opt = a.options;
    opt.target_dir = opt.target_dir || path.resolve(settings.package_dir);

    install.initDir(opt, function (err, opt, cfg) {
        if (err) {
            return callback(err);
        }
        exports.readPackages(settings, cfg, opt, function (err, packages) {
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
    });
}