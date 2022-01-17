function (units, server) {
	var coreSettings = units.require('core.settings').core;
	var prefix = coreSettings.prefix;
	var mechanics = new Mechanics(units, prefix);

	var st = coreSettings.web.static;
	var staticPrefix = st.prefix;

	if (staticPrefix && prefix)
	{
		staticPrefix = prefix + staticPrefix;
	}

	if (!coreSettings.debug)
	{
		server.set('env', 'production');
	}

	// NOTE expecting express
	var express = this.lib;

	server.configure(function () {
		server.use(staticPrefix, express.static(st.paths.main));
	});

	server.configure('development', function () {
		server.use(staticPrefix, express.static(st.paths.dev));
	});

	server.configure(function () {
		server.use(express.bodyParser());
		server.use(express.cookieParser());
		server.use(mechanics.middleware);
	});

	return mechanics;
}