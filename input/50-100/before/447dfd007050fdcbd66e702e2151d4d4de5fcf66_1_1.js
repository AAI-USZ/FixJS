function() {
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    //app.use(express.static(__dirname + '/public'));
    app.use(gzippo.staticGzip(__dirname + '/public'));
    //app.use(gzippo.compress());
    app.enable('view cache');
}