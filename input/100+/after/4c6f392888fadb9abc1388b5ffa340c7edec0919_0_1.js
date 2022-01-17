function () {
    var Store, session;
    try {
        Store = config.session && config.session.store ?
                    require(path.join(process.cwd(), config.session.store))
                    : null;
    } catch (e) {
        throw new RainError('Failed to load session store.', RainError.ERROR_IO);
    }
    try {
        session = config.session && config.session.middleware ?
                    require(path.join(process.cwd(), config.session.middleware))
                    : connect.session;
    } catch (e) {
        throw new RainError('Failed to load session middleware.', RainError.ERROR_IO);
    }

    var sessionStore = new ProxyStore(Store, {
        path: '/',
        httpOnly: true
    });

    this.httpServer = connect()
        .use(connect.favicon())
        .use(connect.cookieParser('let it rain ;)'))
        .use(session({
            key: 'rain.sid',
            secret: 'let it rain ;)',
            store: sessionStore,
            cookie: {
                path: '/',
                httpOnly: true
            }
        }))
        .use(connect.query())
        .use(connect.bodyParser())
        .use(router())
        .use(function (err, req, res, next) {
            routerUtils.handleError(err, req, res);
        })
        .listen(config.server.port);

    this.socket = io.listen(this.httpServer, {
        logger: logger
    });
    this.sessionStore = sessionStore;
    componentRegistry.initialize();

    var socketHandlers = require('./socket_handlers');
    socketHandlers.register();

    logger.info("Server started");
}