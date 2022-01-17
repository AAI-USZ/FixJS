function() {
    app.use(express.logger());
    app.use(express.errorHandler({dumpExceptions: true, showStack: true}));
    app.use(app.router);
    app.use(express.favicon());
    app.use(express.static(options.directory));
}