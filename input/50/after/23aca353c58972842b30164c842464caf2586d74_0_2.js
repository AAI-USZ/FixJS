function (funcDef) {
		var statements = funcDef.getStatements();
		if (statements != null) {
			this._optimizeStatements(funcDef, statements, 0);
		}
	}