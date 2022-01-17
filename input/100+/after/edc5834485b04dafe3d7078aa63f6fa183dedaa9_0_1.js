function configureApplication(config, done) {
    app.config = config;
    if (app.config.install_url.slice(-1) != '/') {
        app.config.install_url += '/';
    }
    app.installation = url.parse(app.config.install_url);
    app.url = function(path) {
        if (path[0] == '/') {
            path = path.slice(1);
        }
        return app.installation.pathname + path;
    };

    app.set('basepath', app.installation.pathname.slice(0, -1));
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');

    if (app.config.log_format) {
        app.use(express.logger(app.config.log_format));
    }

    async.parallel([
        function(callback) {
            utils.getGitVersion(function(err, version) {
                if (!err) {
                    app.version = version;
                }
                return callback(err);
            });
        },
        function(callback) {
            db.init(app.config.db, function (err) {
                if (err) {
                    return callback(err);
                }

                cache.init(app.config.cache, function(err) {
                    return callback(err);
                });
            });
        }
    ], noErr(function() {
        installApplication();
        done();
    }));
}