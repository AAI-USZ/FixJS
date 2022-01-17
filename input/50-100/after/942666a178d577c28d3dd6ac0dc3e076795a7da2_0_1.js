function(){
	app.use(express.bodyParser());
	app.use(express.static(pub));
	app.use(express.errorHandler());
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
}