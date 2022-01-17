function(tagName, line) {
		this.tagName = tagName;
		this.sourceFile = currentTemplate;
		this.sourceLine = line;
		this.attributes = {};
		this.properties = {};
		this.classes = [];
		this.id = undefined;
	}