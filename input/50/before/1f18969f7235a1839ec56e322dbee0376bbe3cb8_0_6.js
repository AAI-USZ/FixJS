function(ranker, rankexpr) {
	if (rankexpr == undefined) rankexpr = '';
	assert(0 <= ranker && ranker < SphinxClient.SPH_RANK_TOTAL)
	this._ranker = ranker
	this._rankexpr = rankexpr
}