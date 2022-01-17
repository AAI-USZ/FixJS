function(next)
{
	var self = this;

	self.program.config = path.resolve(self.program.config);
	// resolve, so we can do things like "xi4n -c ."
	if (!fs.existsSync(self.program.config))
		self.program.invalidOptionValue('-c, --config <path>', 'path does not exist');

	var configFile = path.join(self.program.config, 'config.json');

	if (!fs.existsSync(configFile))
		self.program.invalidOptionValue('-c, --config <path>', 'path exists, but cannot find config.json');

	self.log('Running with given path \'' + self.program.config + '\'');

	var opts = self.load(configFile);

	// handle config.d
	var configD = path.join(self.program.config, 'config.d');

	if (fs.existsSync(configD))
	{
		var files = new glob('*.json', {
			cwd: configD,
			sync: true
		});

		for (var f in files.found)
			opts = self.merge(opts, self.load(path.join(configD, files.found[f])));
	}

	if (!opts)
	{
		self.error('Failed to load configuration file!');
		next();
	}

	// setup clientmanager
	var c = new clientmanager.create(opts, self.program.config);

	if (self.program.watch)
	{
		self.warn('EXPERIMENTAL watch feature enabled. Here be Dragons.');

		// watch the config file, if it changes, reload and sent the config down
		// the tree
		self.watch(configFile, function()
		{
			c.loadOptions(self.load(configFile));
		});
	}

	c.on('drain', function()
	{
		self.log('Lost all InSim connections, quitting');
		next();
	});

	// connect
	c.connect();

	if (process.platform != 'win32')
	{
		// quit on SIGINT gracefully
		// can't do this on Windows yet because of 
		// https://github.com/joyent/node/issues/1553
		process.on('SIGINT', function()
		{
			self.log('Got SIGINT, disconnecting gracefully');
			c.disconnect();
			next();
		});
	}
}