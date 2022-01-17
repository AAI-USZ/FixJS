function run() {
	if (hasInvalidParams()) {
		process.argv = ['node', 'mocha', '--help'];
		help();
	} else {
		runCoverage(consoleArgs);
	}
}