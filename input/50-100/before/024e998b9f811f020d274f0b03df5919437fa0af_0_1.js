function() {
	this.transport.config.set("url", this.config.get("submissionProxyURL"));
	this.request(
		$.extend(this.config.get("data"), {
			"content": this._AS2KVL(this.config.get("data.content"))
		})
	);
}