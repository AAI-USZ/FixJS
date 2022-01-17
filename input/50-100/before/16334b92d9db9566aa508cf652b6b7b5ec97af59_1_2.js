function() {
	it ('should log without doing anything bad', function() {
		var visited = false,
			prevLog = console.error;

		console.error = function() {
				visited = true;
		}

		new ConfigLoader({
			debug: true
		}).load(CONFIG_FILE);

		console.error = prevLog;

		assert(visited, 'Nothing was logged in debug mode!');
	})
}