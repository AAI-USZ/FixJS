function(callback) {
	var self = this;
	var ms = +new Date - timers[numberOfTestsRun].start;
	console.log('  Test', numberOfTestsRun, 'took ' + ms + 'ms')
	numberOfTestsRun += 1;
	// Close connection
	callback();
	client.close();
}