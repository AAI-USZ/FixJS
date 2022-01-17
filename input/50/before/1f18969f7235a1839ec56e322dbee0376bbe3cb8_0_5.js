function(timeout ) {
	assert.equal(typeof timeout, 'float')
	this._timeout = Math.max(0.001, timeout);
}