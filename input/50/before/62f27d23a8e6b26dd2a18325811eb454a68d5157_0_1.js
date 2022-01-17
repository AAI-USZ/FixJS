function(str, doc) {
		if (typeof doc === "undefined") {
			doc = glbls.document;
		}
		if (!doc) {
			throw {
				"name": "OSXHException",
				"message": "Cannot render; no output document. Check the doc parameter."
			}
		}
		return _render(str, doc);
	}