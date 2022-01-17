function(name, args, program) {
	var migrationsDir = path.join(program.outputPath,'migrations');
	U.ensureDir(migrationsDir);
	
	var templatePath = path.join(__dirname,'..','..','..','template','migration.' + CONST.FILE_EXT.MIGRATION);
	var mf = path.join(migrationsDir, GU.generateMigrationFileName(name));
	var md = _.template(fs.readFileSync(templatePath,'utf8'),{});
	fs.writeFileSync(mf,md);

	logger.info('Generated empty migration named '+name);
}