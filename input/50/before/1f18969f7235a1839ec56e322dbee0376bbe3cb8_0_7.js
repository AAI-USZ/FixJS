function(weights) {
	assert(Array.isArray(weights))
	forEach(weights, function(item, index) {
			assert.equal(typeof item, 'number')
	})
	this._weights = weights
}