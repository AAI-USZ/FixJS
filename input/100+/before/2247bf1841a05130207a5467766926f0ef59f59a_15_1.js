function () {
    app.use(express.errorHandler({
        dumpExceptions: true,
        showStack: true
    }));
    app.use(express.cookieParser('this is the secrect for me'));
    app.use(express.session());
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(require('less-middleware')({src: __dirname + '/statics/styles'}));
    app.use(express.static(__dirname + path.sep + 'statics'));
    app.use(app.router);
}