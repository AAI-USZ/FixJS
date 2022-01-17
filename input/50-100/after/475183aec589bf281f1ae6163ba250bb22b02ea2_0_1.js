function () {
		var op = this._expr.getToken().getValue();
		this._emitter._getExpressionEmitterFor(this._expr.getFirstExpr()).emit(_AssignmentExpressionEmitter._operatorPrecedence[op]);
		this._emitter._emit(" " + op + " ", this._expr.getToken());
		this._emitter._emitRHSOfAssignment(this._expr.getSecondExpr(), this._expr.getFirstExpr().getType());
	}