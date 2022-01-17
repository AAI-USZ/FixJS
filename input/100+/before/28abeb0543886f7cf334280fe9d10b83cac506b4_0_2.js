function onExpr(expr) {
					if (expr instanceof LocalExpression
						|| expr instanceof ThisExpression) {
						return false;
					}
					// is PropertyExpression
					if (expr.getIdentifierToken().getValue() == name) {
						return true;
					}
					return onExpr(expr.getExpr());
				}