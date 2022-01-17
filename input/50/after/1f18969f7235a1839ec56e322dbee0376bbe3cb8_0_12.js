function (weights) {
  var self = this
	assert.equal(typeof item, 'object')
	forEach(weights, function (item, index) {
			assert.equal(typeof item, 'number')
	})
	self._indexweights = weights
}