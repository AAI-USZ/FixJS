function runMochaProxy(consoleArgs) {
	var files = getSpecFiles(consoleArgs.specFolders, consoleArgs.specFiles, JS_COVERAGE_BASE);
	var spawnArgs = [Path.join(__dirname, './lib/mocha-coverage')].concat(consoleArgs.params).concat(files);
	var runner = spawn('node', spawnArgs);

	runner.stdout.on('data', function(data) {
		process.stdout.write(data);
	});

	runner.stderr.on('data', function(data) {
		process.stdout.write(data);
	});

	runner.on('exit', function() {
		Helper.resetDir(JS_COVERAGE_BASE);
	});
}