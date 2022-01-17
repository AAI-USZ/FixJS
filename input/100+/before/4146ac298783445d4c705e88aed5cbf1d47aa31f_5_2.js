function(string, onchange, onchange_this) {
	/**
	 * Event fired when any change apply to the object
	 */
	this._onchange = onchange;
	this._onchange_this = onchange_this;
	this.length = 0;
	this.value = "";

	DOMStringCollection_init(this, string);
}