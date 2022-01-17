function (fn) {
  var self = this
	client_say('>2HLL', [SphinxClient.SEARCHD_COMMAND_STATUS, SphinxClient.VER_COMMAND_STATUS, 4, 1]);
	var request = pack( '>2HLL', [SphinxClient.SEARCHD_COMMAND_STATUS, SphinxClient.VER_COMMAND_STATUS, 4, 1])
	self._SendRequest(SphinxClient.VER_COMMAND_STATUS, request, function (err, response) {
		var result = {}, p = 8;
		if (!err) while (p < response.length) {
			var length, k, v;
			length = Number(unpack('>L', response.slice(p, p + 4)))
			k = response.slice(p + 4, p + length + 4)
			p += 4 + length
			length = Number(unpack('>L', response.slice(p, p + 4)))
			v = response.slice(p + 4, p + length + 4)
			p += 4 + length
			result[k] = v.toString()
		}
		fn(err, result);
	})
}