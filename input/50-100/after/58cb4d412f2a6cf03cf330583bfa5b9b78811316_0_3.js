function runMocha(consoleArgs){
	var files = getSpecFiles(consoleArgs.specFolders, consoleArgs.specFiles, consoleArgs.projectFolder);
	process.argv = ['node', 'mocha'].concat(consoleArgs.params.concat(files));
	require('./lib/mocha-coverage');
}