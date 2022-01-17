function(weights) {
	assert.equal(typeof item, 'object')
	forEach(weights, function(item, index) {
			assert.equal(typeof item, 'number')
	})
	this._indexweights = weights
}