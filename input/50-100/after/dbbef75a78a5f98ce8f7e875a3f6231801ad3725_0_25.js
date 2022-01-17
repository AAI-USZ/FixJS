function(truncateLength,fixed) {
	if(fixed == null) fixed = false;
	if(truncateLength == null) truncateLength = false;
	var _g1 = this._i, _g = this._len;
	while(_g1 < _g) {
		var i = _g1++;
		this._vec[i] = null;
	}
	if(truncateLength) {
		this._vec.length = this._i;
		this._len = this._i;
	}
}