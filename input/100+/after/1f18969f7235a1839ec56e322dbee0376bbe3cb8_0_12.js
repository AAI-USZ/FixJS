function (fn) {
  var self = this
	var request = pack ( '>hhI', [SphinxClient.SEARCHD_COMMAND_FLUSHATTRS, SphinxClient.VER_COMMAND_FLUSHATTRS, 0] )
	self._SendRequest(SphinxClient.VER_COMMAND_FLUSHATTRS, request, function (err, response) {
		if (err) {
			return fn(err, null)
		}
		if (response.length != 4) {
			self._error = 'unexpected response length'
			return fn(err, null)
		}
		var tag = Number(unpack('>L', response.slice(0, 4)))
		return fn(err, tag)
	})
}