function (maxquerytime) {
  var self = this
	assert.equal(typeof maxquerytime, 'number')
	assert(maxquerytime > 0)
	self._maxquerytime = maxquerytime
}