function(){
    app.use(express.compress()); 
    app.use(express.bodyParser());
	//app.use(assetsMiddleware);
    
    app.set('views', __dirname + '/views');
    app.register('.html', ejs);
    app.set('view engine', 'ejs');
    
    app.use(express.methodOverride());
    app.use(express.favicon(__dirname + '/public/favicon.ico', {maxAge: 31557600000}));
    app.use(app.router);
}