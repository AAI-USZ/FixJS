function(next)
{
	var self = this;

	// performs install of config path
	self.program.install = path.resolve(self.program.install);

	var exists = fs.existsSync(self.program.install);

	if (exists && !self.program.force)
	{
		self.warn('Forcing overwrite of existing files and directories');
		next();
	}

	if (!exists)
	{
		self.log('Creating destination directory');
		if (fsutil.mkdir(self.program.install) < 0)
			self.error('Failed');
	}

	// README
	self.log('Creating \'' + path.join(self.program.install, 'README') + '\'');
	if (fsutil.mkfile(
		path.join(self.program.install, 'README'), 
		baseREADME,
		self.program.force
	) < 0)
		self.error('Failed');

	// config.json
	self.log('Creating \'' + path.join(self.program.install, 'config.json') + '\'');
	if (fsutil.copyfile(
		path.join(product.basedir, 'config.json'), 
		path.join(self.program.install, 'config.json'),
		self.program.force
	) < 0)
		self.error('Failed');

	// plugins & data
	self.deployDataAndPlugins(product.basedir, self.program.install, self.program.force, self.program.symlink, next);
}