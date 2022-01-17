function (ranker, rankexpr) {
  var self = this
  if (rankexpr === undefined) {
    rankexpr = ''
  }
	assert(0 <= ranker && ranker < SphinxClient.SPH_RANK_TOTAL)
	self._ranker = ranker
	self._rankexpr = rankexpr
}