function() {
    app.use(express.logger());
    app.use(express.errorHandler({dumpExceptions: true, showStack: true}));
    app.use(app.router);
    app.use(express.favicon());
    // Resolve '.' to actual path, or Express explodes with "Forbidden at SendStream.error"
    app.use(express.static(fs.realpathSync(options.directory)));
}