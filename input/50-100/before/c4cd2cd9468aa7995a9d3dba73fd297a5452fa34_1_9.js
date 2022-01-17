function(props) {
	for (var i in props) {
		if (goog.isDef(this._mStyle[props[i]])) {
			return true;
		}
	}

	return false;
}