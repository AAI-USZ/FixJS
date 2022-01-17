function runCoverage(consoleArgs) {
	if (hasInvalidParams()) return;
	if (Helper.resetDir(JS_COVERAGE_BASE) === false) return;

	Helper.jscoverage(consoleArgs.projectFolder, JS_COVERAGE_BASE, function(err) {
		if (err) {
			console.log(err.toString());
			return;
		}
		runJasmineProxy(consoleArgs);
	});
}