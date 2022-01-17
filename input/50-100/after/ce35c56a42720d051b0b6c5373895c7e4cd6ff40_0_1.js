function(next)
{
	var self = this;

	// performs update of config path
	self.program.update = path.resolve(self.program.update);

	var exists = fs.existsSync(self.program.update);

	if (!exists)
		self.program.invalidOptionValue('-u, --update <path>', 'Path does not exist! Cannot update.');

	self.deployDataAndPlugins(product.basedir, self.program.update, true, self.program.symlink, next);
}