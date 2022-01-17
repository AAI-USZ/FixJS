function (settings, args) {
    var a = argParse(args, {
        'target_dir': {match: ['-d', '--package-dir'], value: true}
    });
    var opt = a.options;

    opt.target_dir = opt.target_dir || path.resolve('jam');
    exports.clean(opt, function (err) {
        if (err) {
            return logger.error(err);
        }
        logger.end();
    });
}