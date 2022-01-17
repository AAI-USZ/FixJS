function(attribute) {
	assert.equal(typeof attribute, 'string')
	this._groupdistinct = attribute
}