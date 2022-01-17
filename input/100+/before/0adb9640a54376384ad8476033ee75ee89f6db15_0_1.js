function installApplication() {
    var c = require('./controllers');
    var auth = require('./auth');

    auth.install();

    app.contentCache = ContentCache(app.version);
    app.assetStore = AssetStore({
        assetRoot: __dirname + '/static',
        assetUrl: 'assets',
        contentCache: app.contentCache,
        compile: !app.config.debug,
    });
    app.renderer = template.Renderer(__dirname + '/templates');
    app.renderer.contextExtensions.push(context_extensions.AssetCompiler(app.assetStore));

    app.assetStore.register('timeit.css', [
        'css/bootstrap.css',
        'css/datepicker.css',
        'css/timeit.css',
    ]);

    app.assetStore.register('index.css', [
        'css/index.css',
    ]);

    app.assetStore.register('timeit.js', [
        'js/lib/jquery.js',
        'js/lib/jquery.favicon.js',
        'js/lib/underscore.js',
        'js/lib/backbone.js',
        'js/lib/bootstrap.js',
        'js/lib/bootstrap-datepicker.js',
        'js/lib/raphael.js',
        'js/lib/moment.js',
        'js/underscore.exttemplate.js',
        'js/jquery.time-slider.js',
        'js/jquery.hold-button.js',
        'js/jquery.disableselection.js',
        'js/backbone.mixin.js',
        'js/backbone.template.js',
        'js/backbone.bootstrap.js',
        'js/timeit.js',
        'js/timeit.utils.js',
        assets.TemplateLoader({
                templateDir: 'templates',
                objectName: 'timeit.loadTemplate'
        }),
        'js/views/Tracker.js',
        'js/views/SetActivityForm.js',
        'js/views/EditActivityForm.js',
        'js/views/Intersection.js',
        'js/views/Today.js',
        'js/views/AuthLinks.js',
        'js/views/Account.js',
        'js/views/Question.js',
        'js/views/Alert.js',
        'js/views/Overview.js',
        'js/views/DateRangePicker.js',
        'js/views/ActivityList.js',
        'js/views/TimeLine.js',
        'js/views/Totals.js',
        'js/views/Stats.js',
        'js/views/MassiveEditList.js',
        'js/views/MassiveEditForm.js',
        'js/version.js',
    ]);

    app.assetStore.register('index.js', [
        'js/index.js',
    ]);

    function redirectRoot(req, res, next) {
        if (url.parse(req.url).pathname == '/' && req.originalUrl.slice(-1) != '/') {
            res.redirect('', 301);
        } else {
            next();
        }
    }

    function myResponse(req, res, next) {
        res.okJson = function(body) {
            res.json({status: 'ok', body: body});
        };
        res.errJson = function(body) {
            res.json({status: 'err', body: body});
        }
        next();
    }

    var staticPath = path.join(__dirname, 'static');
    var icoPath = path.join(path.dirname(require.resolve('everyauth')), 'media');

    app.use(redirectRoot);
    app.use(express.static(staticPath, {
        maxAge: app.config.staticFilesMaxAge * 1000
    }));
    app.use('/ico', express.static(icoPath, {
        maxAge: app.config.staticFilesMaxAge * 1000
    }));
    app.use(app.assetStore.middleware());
    app.use(myResponse);
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.session({
        secret: app.config.secret,
        store: new MongoStore({db: db.mongo}),
    }));
    app.use(auth.middleware());
    app.use(express.csrf());
    app.use(app.router);
    app.use(express.errorHandler({
        dumpExceptions: !!app.config.log_format,
        showStack: !!app.config.debug
    }));

    app.get ('/', c.index);
    app.get ('/login', c.login);
    app.get ('/confirm', c.getConfirm);
    app.post('/confirm', c.postConfirm);

    app.get ('/today', c.activity.today);
    app.get ('/activity', c.activity.get);
    app.get ('/log', c.activity.getLog);
    app.get ('/stats', c.activity.getStats);
    app.get ('/groups', c.activity.getGroups);
    app.post('/activity', c.activity.edit);
    app.post('/remove', c.activity.remove);
    app.post('/current', c.activity.setCurrent);
    app.post('/current/stop', c.activity.stop);
    app.post('/group', c.activity.updateGroup);

    app.get ('/settings', c.aux.getSettings);
    app.post('/settings', c.aux.setSettings);
    app.get ('/csrf-token', c.aux.getCsrfToken);
    app.get ('/version', c.aux.getVersion);
    app.get ('/messages', c.aux.getMessages);

    app.get ('/auth/status', c.auth.status);
    app.get ('/auth/links', c.auth.links);
    app.post('/auth/unlink', c.auth.unlink);
    app.post('/auth/remove-account', c.auth.removeAccount);
}