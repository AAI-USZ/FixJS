function () {
		switch (this._analyzeState) {
		case MemberVariableDefinition.NOT_ANALYZED:
			try {
				this._analyzeState = MemberVariableDefinition.IS_ANALYZING;
				if (this._initialValue != null) {
					if (! this._initialValue.analyze(this._analysisContext))
						return;
					var ivType = this._initialValue.getType();
					if (this._type == null) {
						if (ivType.equals(Type.Type.nullType)) {
							this._analysisContext.errors.push(new CompileError(this._initialValue.getToken(), "cannot assign null to an unknown type"));
							return;
						}
						this._type = ivType.asAssignableType();
					} else if (! ivType.isConvertibleTo(this._type)) {
						this._analysisContext.errors.push(new CompileError(this._nameToken,
							"the variable is declared as '" + this._type.toString() + "' but initial value is '" + ivType.toString() + "'"));
					}
				}
				this._analyzeState = MemberVariableDefinition.ANALYZE_SUCEEDED;
			} finally {
				if (this._analyzeState != MemberVariableDefinition.ANALYZE_SUCEEDED)
					this._analyzeState = MemberVariableDefinition.ANALYZE_FAILED;
			}
			break;
		case MemberVariableDefinition.IS_ANALYZING:
			this._analysisContext.errors.push(new CompileError(this._token,
				"please declare type of variable '" + this.name() + "' (detected recursion while trying to reduce type)"));
			break;
		default:
			break;
		}
		return this._type;
	}