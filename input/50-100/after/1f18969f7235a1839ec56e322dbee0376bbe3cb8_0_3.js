function (attrlat, attrlong, latitude, longitude) {
  var self = this
	assert.equal(typeof attrlat, 'string')
	assert.equal(typeof attrlong, 'string')
	assert.equal(typeof latitude, 'float')
	assert.equal(typeof longitude, 'float')
	self._anchor['attrlat'] = attrlat
	self._anchor['attrlong'] = attrlong
	self._anchor['lat'] = latitude
	self._anchor['long'] = longitude
}