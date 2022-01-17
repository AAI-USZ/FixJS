function(props) {
	for (var i in props) {
		if (!this._contains(props[i], '-') && goog.isDef(this._mStyle[props[i]])) {
			return true;
		}
	}

	return false;
}