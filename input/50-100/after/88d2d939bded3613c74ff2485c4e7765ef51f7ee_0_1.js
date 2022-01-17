function (context) {
		try {
			this._analyzeClassDef(context);
		} catch (e) {
			var Parser = require("./parser");
			var token = this.getToken();
			console.error("fatal error while analyzing class " + this.className());
			throw e;
		}
		this._analyzeMemberFunctions(context);
	}