function MongoStore(options, callback) {
	options = options || {};
	callback = _default(callback);

	var db, server_config, url, auth;

	function getCollection(db, callback) {
		db.collection(options.collection || _defaults.collection, function (err, col) {
			if (err) callback(err);
			_collection = col;
			callback();
		});
	}

	function authenticateAndGetCollection(callback) {
		if (options.username && options.password) {
			db.authenticate(options.username, options.password, function () {
				getCollection(db, callback);
			});
		} else {
			getCollection(db, callback);
		}
	}

	if (options.url) {
		url = require('url').parse(options.url);

		if (url.auth) {
			auth = url.auth.split(':', 2);
			options.username = auth[0];
			options.password = auth[1];
		}

		options.db = new mongo.Db(url.pathname.replace(/^\//, ''),
			new mongo.Server(url.hostname || _defaults.host,
				parseInt(url.port) || _defaults.port));
	}

	if (options.server_config) {
		server_config = options.server_config;
		db = new mongo.Db(options.dbname || _defaults.dbname, server_config);
	}

	if (options.db) {
		server_config = options.db.serverConfig;
		db = options.db;
	}

	if (!db || !server_config) {
		return callback(Error('You must provide a `db` or `server_config`!'));
	}

	Store.call(this, options);

	if (options.reapInterval !== -1)
	{
		var reap_interval = setInterval(
			function ()
			{
				if (_collection)
					_collection.remove({expires: {'$lte': Date.now()}}, function () { });
			},
			options.reapInterval || _defaults.reapInterval, this
		); // _defaults to each minute

		db.on('close',
			function()
			{
				clearInterval(reap_interval);
			}
		);
	}

	if (server_config.connected) {
		authenticateAndGetCollection(callback);
	} else {
		server_config.connect(db, function (err) {
			if (err) callback(Error("Error connecting (" + (err instanceof Error ? err.message : err) + ")"));
			authenticateAndGetCollection(callback);
		})
	}
}