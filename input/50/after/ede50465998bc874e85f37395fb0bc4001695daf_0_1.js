function (aURI, aEncoding) {
		var completeURI = this._suite.fixupIncompleteURI(aURI);
		var scriptContent = ns.utils.readFrom(completeURI, aEncoding || this.defaultEncoding) || "";
		return scriptContent;
	}