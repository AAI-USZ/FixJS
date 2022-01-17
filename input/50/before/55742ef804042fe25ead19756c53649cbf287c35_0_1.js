function () {
		return _InExpressionEmitter._operatorPrecedence[this._expr.getToken().getValue()];
	}