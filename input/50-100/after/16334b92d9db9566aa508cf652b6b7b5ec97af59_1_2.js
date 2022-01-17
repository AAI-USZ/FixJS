function() {
	it ('should call the observer function', function() {
		var visited = false;

		new ConfigLoader({
			observer: function(filename, data) {
				assert.equal(typeof filename, 'string');
				assert.equal(typeof data, 'object');
				visited = true;
			}
		}).load(CONFIG_FILE);

		assert(visited, 'Nothing was logged in debug mode!');
	})
}