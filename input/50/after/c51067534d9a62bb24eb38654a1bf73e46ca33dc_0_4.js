function(name, expr, line) {
		this.name = name;
		this.expr = expr;
		this.sourceFile = currentTemplate;
		this.sourceLine = line;
	}