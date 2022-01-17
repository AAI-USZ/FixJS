function(string, getter, setter, object_this) {
	/**
	 * Event fired when any change apply to the object
	 */
	this._getter = getter;
	this._setter = setter;
	this._object_this = object_this;
	this.length = 0;
	this.value = "";

	this.DOMStringCollection_check_currentValue_and_Token("1");//"1" - fakse token, need only thisObj.value check
}