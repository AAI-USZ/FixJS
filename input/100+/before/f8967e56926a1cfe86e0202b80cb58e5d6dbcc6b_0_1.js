function (err, meta) {
        if (err) {
            return callback(err);
        }
        if (!opt.includes.length) {
            // compile all installed modules by default
            opt.includes = Object.keys(meta.dependencies);
        }
        if (!opt.output) {
            return callback('You must specify an output file');
        }

        logger.info('compiling', opt.output);
        if (opt.includes.length) {
            logger.info('include', opt.includes.join(', '));
        }

        var source = '.';
        var configfile = path.resolve(
            source,
            opt.pkgdir,
            'require.config'
        );
        var packages = require(configfile).packages;

        var impl;
        if (opt.almond) {
            logger.info('using almond.js');
            impl = path.relative(
                source,
                path.resolve(__dirname, '../../node_modules/almond/almond.js')
            );
        }
        else {
            var impl = path.relative(
                source,
                path.resolve(__dirname, '../../node_modules/requirejs/require.js')
            );
        }

        var includes;
        if (opt.almond) {
            includes = opt.includes;
        }
        else {
            includes = ['jam/require.config.js'].concat(opt.includes);
        }

        var config = {
            baseUrl: source,
            packages: packages,
            name: impl,
            wrap: opt.wrap,
            optimize: 'uglify',
            include: includes,
            out: opt.output
        };
        if (opt.verbose) {
            config.logLevel = 0;
        }
        if (opt.nominify) {
            config.optimize = 'none';
        }
        if (opt.nolicense) {
            config.preserveLicenseComments = false;
        }
        if (opt.shallowExcludes && opt.shallowExcludes.length) {
            config.excludeShallow = opt.shallowExcludes;
        }
        if (opt.deepExcludes && opt.deepExcludes.length) {
            config.exclude = opt.deepExcludes;
        }
        try {
            requirejs.optimize(config, function (build_response) {
                callback(null, build_response);
            });
        }
        catch (e) {
            return callback(e);
        }
    }