function() {
	var eventEmitter = new EventEmitter2({
		wildcard: true
	});

	browser.run({
		eventEmitter: eventEmitter,
		htmlPath: path.join(__dirname, 'chook/sandbox/index.html'),
		scripts: scripts,
		runner: runner
	});

	eventEmitter.on('*', function(output) {
		globalEventEmitter.emit(this.event, output);
	});

	return eventEmitter;
}