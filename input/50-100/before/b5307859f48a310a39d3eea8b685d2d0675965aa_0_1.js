function() {
	var method = this["_" + this.config.get("endpoint")];
	method && method.apply(this, arguments);
}