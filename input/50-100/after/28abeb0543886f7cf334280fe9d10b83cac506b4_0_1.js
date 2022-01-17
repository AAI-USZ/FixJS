function (expr) {
			if (expr instanceof PropertyExpression) {
				var base = getCacheKey(expr.getExpr());
				if (base == null) {
					return null;
				}
				return base + "." + expr.getIdentifierToken().getValue();
			} else if (expr instanceof LocalExpression) {
				return expr.getLocal().getName().getValue();
			} else if (expr instanceof ThisExpression) {
				return "this";
			}
			return null;
		}