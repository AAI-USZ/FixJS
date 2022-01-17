function (count, delay) {
  var self = this
	if (delay == undefined) delay = 0;
	assert.equal(typeof count, 'number')
	assert.equal(typeof delay, 'number')
	assert(count >= 0)
	assert(delay >= 0)
	self._retrycount = count
	self._retrydelay = delay
}