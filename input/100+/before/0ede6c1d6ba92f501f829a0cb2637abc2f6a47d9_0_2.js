f	this.source = source;
	this.current = 0;
	this.position = -1;
	this.remaining = source.length;

	var result;
	switch (source[0]) {
		case '{':
			result = this.readPropertyGroup();
			break;
		case '[':
			result = this.readArrayGroup();
			break;
		default:
			throw new Error("Pattern must start with '{' or '['", "pattern");
	}
	if (this.remaining != 0)
		throw new Error("Unexpected character(s) at the end of the Propex.");

	return result;
}
