function(name, type, values) {
	assert.equal(typeof name, 'string')
	assert(SphinxClient.SPH_ATTR_TYPES.some(function(x) { return (x === type) }))
	assert.equal(typeof values, 'object')
	this._overrides[name] = {
		'name': name, 
		'type': type, 
		'values': values
	}
}