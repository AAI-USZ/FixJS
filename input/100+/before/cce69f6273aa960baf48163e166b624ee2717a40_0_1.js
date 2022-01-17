function () {
		var precedence = this._getPrecedence();
		var ifTrueExpr = this._expr.getIfTrueExpr();
		if (ifTrueExpr != null) {
			this._emitter._getExpressionEmitterFor(this._expr.getCondExpr()).emit(precedence);
			this._emitter._emit(" ? ", null);
			this._emitter._getExpressionEmitterFor(ifTrueExpr).emit(precedence);
			this._emitter._emit(" : ", null);
			this._emitter._getExpressionEmitterFor(this._expr.getIfFalseExpr()).emit(precedence);
		} else {
			this._emitter._getExpressionEmitterFor(this._expr.getCondExpr()).emit(precedence);
			this._emitter._emit(" || ", null);
			this._emitter._getExpressionEmitterFor(this._expr.getIfFalseExpr()).emit(precedence);
		}
	}