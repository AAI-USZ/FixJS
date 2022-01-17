function (aURI, aEncoding) {
		var completeURI = ns.utils.fixupIncompleteURI(aURI);
		var scriptContent = ns.utils.readFrom(aURI, aEncoding || this.defaultEncoding) || "";
		return scriptContent;
	}