function installApplication() {
    var c = require('./controllers');
    var auth = require('./auth');

    app.set('basepath', app.installation.pathname.slice(0, -1));

    if (app.config.log_format) {
        app.use(express.logger(app.config.log_format));
    }

    auth.install();
    i18n.configure({
        locales: ['en', 'ru']
    });

    app.helpers({
        __: i18n.__,
        __n: i18n.__n,
    });
    app.dynamicHelpers({
        _csrf: function (req, res) {
            return req.session._csrf;
        },
        language: function (req, res) {
            return req.language;
        },
    });

    app.contentCache = ContentCache(app.version);
    app.assetStore = AssetStore({
        assetRoot: __dirname + '/frontend',
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
        'js/lib/async.js',
        'js/underscore.exttemplate.js',
        'js/jquery.time-slider.js',
        'js/jquery.hold-button.js',
        'js/jquery.disableselection.js',
        'js/backbone.mixin.js',
        'js/backbone.template.js',
        'js/backbone.bootstrap.js',
        'js/i18n.js',
        'js/timeit.js',
        'js/timeit.utils.js',
        assets.TemplateLoader({
                templateDir: 'templates',
                objectName: 'timeit.loadTemplate'
        }),
        assets.Inline('(function() {timeit.debug = '+app.config.debug+';})()'),
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
            res.redirect('/', 301);
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

    var frontendPath = path.join(__dirname, 'frontend');
    var icoPath = path.join(path.dirname(require.resolve('everyauth')), 'media');
    var localesPath = path.join(__dirname, 'locales');

    app.use(redirectRoot);
    app.use(express.static(frontendPath, {
        maxAge: app.config.staticFilesMaxAge * 1000
    }));
    app.use('/ico', express.static(icoPath, {
        maxAge: app.config.staticFilesMaxAge * 1000
    }));
    app.use('/locales', express.static(localesPath, {
        maxAge: app.config.staticFilesMaxAge * 1000
    }));
    app.use(app.renderer.middleware());
    app.use(i18n.init);
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
    app.get ('/login.html', c.login);
    app.get ('/confirm.html', c.confirm);

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
    app.get ('/language', c.aux.getLanguage);
    if (app.config.debug) {
        app.get ('/translate', c.aux.translate);
    }

    app.get ('/auth/status', c.auth.status);
    app.get ('/auth/links', c.auth.links);
    app.post('/auth/unlink', c.auth.unlink);
    app.post('/auth/remove-account', c.auth.removeAccount);
    app.post('/confirm', c.auth.confirmAccount);
}