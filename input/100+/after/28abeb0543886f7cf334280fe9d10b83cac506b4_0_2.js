function (name) {
			this.log("clearing lcse entry for property name: " + name);
			for (var k in cachedExprs) {
				var mayPreserve = function onExpr(expr) {
					if (expr instanceof LocalExpression
						|| expr instanceof ThisExpression) {
						return true;
					}
					// is PropertyExpression
					if (expr.getIdentifierToken().getValue() == name) {
						return false;
					}
					return onExpr(expr.getExpr());
				}(cachedExprs[k].getOrigExpr());
				if (! mayPreserve) {
					this.log("  removing: " + k);
					delete cachedExprs[k];
				}
			}
		}