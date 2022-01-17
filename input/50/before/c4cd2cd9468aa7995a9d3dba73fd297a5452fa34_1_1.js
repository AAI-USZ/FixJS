function() {
	return !!this._testProps(['transformProperty', 'WebkitTransform', 'MozTransform', 'OTransform', 'msTransform']);
}