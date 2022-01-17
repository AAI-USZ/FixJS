function (funcDef) {
if (++this._numFunctionsOptimized > 2000000) return;
		var statements = funcDef.getStatements();
		if (statements != null) {
			this._optimizeStatements(funcDef, statements, 0);
		}
	}