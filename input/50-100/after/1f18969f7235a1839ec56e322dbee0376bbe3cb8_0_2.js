function (mode) {
  var self = this
	var modes = [SphinxClient.SPH_MATCH_ALL, SphinxClient.SPH_MATCH_ANY, SphinxClient.SPH_MATCH_PHRASE, SphinxClient.SPH_MATCH_BOOLEAN, SphinxClient.SPH_MATCH_EXTENDED, SphinxClient.SPH_MATCH_FULLSCAN, SphinxClient.SPH_MATCH_EXTENDED2]
	assert(modes.some(function (x) { return (x === mode) }))
	self._mode = mode
}