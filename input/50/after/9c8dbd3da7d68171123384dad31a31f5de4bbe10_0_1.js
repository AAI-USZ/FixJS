function abandon() {
	this._binding._abandon();
	this._binding = null;
}