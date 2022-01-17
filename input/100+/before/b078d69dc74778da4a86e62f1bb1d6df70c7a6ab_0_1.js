f		if (this._expect("(") == null)
			return null;
		var args = this._functionArgumentsExpr(false, nameOfFunctionStatement != null);
		if (args == null)
			return null;
		var returnType = null;
		if (this._expectOpt(":") != null) {
			if ((returnType = this._typeDeclaration(true)) == null)
				return null;
		}
		if (this._expect("{") == null)
			return null;

		if (nameOfFunctionStatement != null) {
			// add name to current scope for local function declaration
			var argTypes = args.map(function(arg) { return arg.getType(); });
			var type = new StaticFunctionType(returnType, argTypes, false);
			this._registerLocal(nameOfFunctionStatement, type);
		}
		// parse function block
		var state = this._pushScope(args);
		var lastToken = this._block();
		if (lastToken == null) {
			this._popScope();
			return null;
		}
		var funcDef = new MemberFunctionDefinition(token, null, ClassDefinition.IS_STATIC, returnType, args, this._locals, this._statements, this._closures, lastToken);
		this._popScope();
		this._closures.push(funcDef);
		return new FunctionExpression(token, funcDef);
	},
