function (host, port) {
  var self = this
	assert.equal(typeof host, 'string')
	assert.equal(typeof port, 'number')
	self._host = host;
	self._port = port;
}