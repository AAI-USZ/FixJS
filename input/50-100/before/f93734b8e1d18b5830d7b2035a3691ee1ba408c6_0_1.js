function() {
	app.use(express.static(__dirname, {maxAge: 60000}));
	app.use(browserify({
		require : [ 'events', 'util', './color', './explosion', './snake', './vector', './ball', './entity', './world' ]
	}));
	app.set('view options', { layout: false });
	app.set('view engine', 'ejs');
	app.use(express.errorHandler());
}