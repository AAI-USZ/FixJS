function (settings, args) {
    var a = argParse(args, {
        'repository': {match: ['-r', '--repository'], value: true},
        'target_dir': {match: ['-d', '--package-dir'], value: true}
    });

    var opt = a.options;
    var deps = a.positional;

    opt.target_dir = opt.target_dir || path.resolve('jam');
    opt.repositories = settings.repositories;
    if (a.options.repository) {
        opt.repositories = [a.options.repository];
        // don't allow package dir .kansorc file to overwrite repositories
        opt.fixed_repositories = true;
    }
    exports.upgrade(deps, opt, function (err) {
        if (err) {
            return logger.error(err);
        }
        logger.end();
    });
}