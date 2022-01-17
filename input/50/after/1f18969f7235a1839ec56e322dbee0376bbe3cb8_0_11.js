function (weights) {
  var self = this
	assert(Array.isArray(weights))
	forEach(weights, function (item, index) {
			assert.equal(typeof item, 'number')
	})
	self._weights = weights
}