function initRailway(app) {
    var isMainModule = !global.hasOwnProperty('app');
    // globalize app object
    if (isMainModule) {
        global.app = app;
        app.root = process.cwd();
        app.models = {};
    }

    var root;
    if (typeof app === 'string') {
        root = app;
        if (!isMainModule) {
            var cb = new railway.ControllerBridge(root);
        }
    } else {
        root = app.root;
    }

    // create API publishing object
    new Railway();

    // run environment.{js|coffee} and environments/{test|development|production}.{js|coffee}
    configureApp(root, isMainModule);

    // controllers should be loaded before extensions
    railway.controller.init(root);

    // extensions should be loaded before server startup
    railway.extensions.init(root);

    // init models in app/models/*
    railway.models.init(root);

    // run config/initializers/*
    runInitializers(root);

    if (railway.utils.existsSync(root + '/config') && (railway.utils.existsSync(root + '/config/routes.js') || railway.utils.existsSync(root + '/config/routes.coffee'))) {
        railway.routeMapper.addRoutes(root + '/config/routes', isMainModule ? null : cb.uniCaller.bind(cb));
    }

    // everything else can be done after starting server
    process.nextTick(function () {

        railway.locales.init(root);
        railway.logger.init(app.root);
        app.reloadModels = railway.models.loadModels;

        loadObservers();

        if (global.app.enabled('merge javascripts')) {
            ensureDirClean(app.root + '/public' + app.set('jsDirectory') + 'cache');
        }

        if (global.app.enabled('merge stylesheets')) {
            ensureDirClean(app.root + '/public' + app.set('cssDirectory') + 'cache');
        }

    });
}