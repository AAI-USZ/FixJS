function onExpr(expr) {
			if (expr instanceof PropertyExpression
				&& expr.getIdentifierToken().getValue() == "length"
				&& expr.getExpr() instanceof LocalExpression
				&& this._typeIsArray(expr.getExpr().getType().resolveIfNullable())) {
				local = expr.getExpr().getLocal();
				return false;
			}
			return expr.forEachExpression(onExpr.bind(this));
		}