function (select) {
  var self = this
	assert.equal(typeof select, 'string')
	self._select = select
}