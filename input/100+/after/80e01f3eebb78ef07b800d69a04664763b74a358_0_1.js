function() {
		app.set('views', __dirname + '/views');
		app.set('view engine', 'jade');
		app.set('port', 3000);
		app.use(express.favicon());
		app.use(express.logger('dev'));
		app.use(stylus.middleware({
			  src: __dirname + '/views'
			, dest: __dirname + '/public'
		}));
		app.use(express.bodyParser());
		app.use(express.methodOverride());
		app.use(express.cookieParser(cookieSecret));
		app.use(express.session({
			  store: sessionStore
			, key: sessionKey
		}));
		// order matters: needs to be after stylus for it to recompile
		app.use(express.static(__dirname + '/public')); 
	}