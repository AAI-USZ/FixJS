function (input, errors) {
		// lexer properties
		this._input = input;
		this._lines = this._input.split(/\r|\n|\r\n/);
		this._tokenLength = 0;
		this._lineNumber = 1; // one origin
		this._columnOffset = 0; // zero origin
		// insert a marker so that at the completion location we would always get _expectIdentifierOpt called, whenever possible
		if (this._completionRequest != null) {
			var compLineNumber = Math.min(this._completionRequest.getLineNumber(), this._lines.length + 1);
			this._lines[compLineNumber - 1] =
				this._lines[compLineNumber - 1].substring(0, this._completionRequest.getColumnOffset())
				+ "Q," + // use a character that is permitted within an identifier, but never appears in keywords
				this._lines[compLineNumber - 1].substring(this._completionRequest.getColumnOffset());
		}
		// output
		this._errors = errors;
		this._templateClassDefs = [];
		this._classDefs = [];
		this._imports = [];
		// use for function parsing
		this._locals = null;
		this._statements = null;
		this._closures = [];
		this._extendType = null;
		this._implementTypes = null;
		this._objectTypesUsed = [];
		this._templateInstantiationRequests = [];

		// doit
		while (! this._isEOF()) {
			var importToken = this._expectOpt("import");
			if (importToken == null)
				break;
			this._importStatement(importToken);
		}
		while (! this._isEOF()) {
			if (! this._classDefinition())
				return false;
		}

		if (this._errors.length != 0)
			return false;

		return true;
	}