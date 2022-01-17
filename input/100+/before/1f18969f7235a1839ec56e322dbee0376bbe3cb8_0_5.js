function(attribute, func, groupsort ) {
	if (groupsort == undefined) groupsort = '@group desc';
	assert.equal(typeof attribute, 'string')
	assert.equal(typeof groupsort, 'string')
	var funcs = [SphinxClient.SPH_GROUPBY_DAY, SphinxClient.SPH_GROUPBY_WEEK, SphinxClient.SPH_GROUPBY_MONTH, SphinxClient.SPH_GROUPBY_YEAR, SphinxClient.SPH_GROUPBY_ATTR, SphinxClient.SPH_GROUPBY_ATTRPAIR]
	assert(funcs.some(function(x) { return (x === func) }))
	this._groupby = attribute
	this._groupfunc = func
	this._groupsort = groupsort
}