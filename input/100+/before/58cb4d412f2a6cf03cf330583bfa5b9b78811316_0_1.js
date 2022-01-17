function runJasmineProxy(consoleArgs) {
	var files = foldersToFiles(consoleArgs.specFolders).concat(consoleArgs.specFiles);
	var spawnArgs = [Path.join(__dirname, './lib/mocha-coverage')].concat(consoleArgs.params).concat(files);
	var runner = spawn('node', spawnArgs);

	runner.stdout.on('data', function(data) {
		process.stdout.write(data.toString());
	});

	runner.stderr.on('data', function(data) {
		process.stdout.write(data.toString());
	});

	runner.on('exit', function() {
		Helper.resetDir(JS_COVERAGE_BASE);
	});
}