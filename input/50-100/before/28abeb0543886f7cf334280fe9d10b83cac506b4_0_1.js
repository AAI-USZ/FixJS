function (expr) {
			if (expr instanceof PropertyExpression) {
				return getCacheKey(expr.getExpr()) + "." + expr.getIdentifierToken().getValue();
			} else if (expr instanceof LocalExpression) {
				return expr.getLocal().getName().getValue();
			} else if (expr instanceof ThisExpression) {
				return "this";
			}
			return null;
		}