function (funcDef, exprs) {
		this.log("optimizing expressions starting");

		var cachedExprs = {}; // serialized => [ expr, replaceCb ]

		var getCacheKey = function (expr) {
			if (expr instanceof PropertyExpression) {
				return getCacheKey(expr.getExpr()) + "." + expr.getIdentifierToken().getValue();
			} else if (expr instanceof LocalExpression) {
				return expr.getLocal().getName().getValue();
			} else if (expr instanceof ThisExpression) {
				return "this";
			}
			return null;
		}.bind(this);

		var registerCacheable = function (key, expr, replaceCb) {
			this.log("registering lcse entry for: " + key);
			cachedExprs[key] = [ expr, replaceCb ];
		}.bind(this);

		var clearCacheByPropertyName = function (name) {
			this.log("clearing lcse entry for propery name: " + name);
			for (var k in cachedExprs) {
				var shouldClear = function onExpr(expr) {
					if (expr instanceof LocalExpression
						|| expr instanceof ThisExpression) {
						return false;
					}
					// is PropertyExpression
					if (expr.getIdentifierToken().getValue() == name) {
						return true;
					}
					return onExpr(expr.getExpr());
				}(cachedExprs[k][0]);
				if (shouldClear) {
					delete cachedExprs[k];
				}
			}
		}.bind(this);

		var clearCache = function () {
			this.log("clearing lcse cache");
			cachedExprs = {};
		}.bind(this);

		// add an expression to cache
		var onExpr = function (expr, replaceCb) {
			// handle special cases first
			if (expr instanceof AssignmentExpression) {
				// optimize RHS
				onExpr(expr.getSecondExpr(), function (receiver) {
					return function (expr) {
						receiver.setSecondExpr(expr);
					};
				}(expr));
				// optimize LHS
				var lhsExpr = expr.getFirstExpr();
				if (lhsExpr instanceof LocalExpression) {
					// skip
				} else if (lhsExpr instanceof PropertyExpression) {
					onExpr(lhsExpr.getExpr(), function (receiver) {
						return function (expr) {
							receiver.setExpr(expr);
						};
					}(lhsExpr));
					var cacheKey = getCacheKey(lhsExpr);
					if (cacheKey) {
						registerCacheable(cacheKey, lhsExpr, function (receiver) {
							return function (expr) {
								receiver.setFirstExpr(expr);
							}
						}(expr));
					}
				} else {
					clearCache();
				}
				return true;
			} else if (expr instanceof PreIncrementExpression
				|| expr instanceof PostIncrementExpression) {
				// optimize the receiver of LHS, and clear (for now)
				if (expr.getExpr() instanceof PropertyExpression) {
					onExpr(expr.getExpr().getExpr(), function (receiver) {
						return function (expr) {
							receiver.setExpr(expr);
						};
					}(expr.getExpr()));
				}
				clearCache();
				return true;
			} else if (expr instanceof FunctionExpression) {
				clearCache();
				return true;
			} else if (expr instanceof CallExpression) {
				// optimize the receiver (not the function) and args, and clear
				var funcExpr = expr.getExpr();
				if (funcExpr instanceof LocalExpression) {
					// nothing to do
				} else if (funcExpr instanceof PropertyExpression) {
					onExpr(expr.getExpr().getExpr(), function (receiver) {
						return function (expr) {
							receiver.setExpr(expr);
						}
					}(expr.getExpr()));
				} else {
					clearCache();
				}
				var args = expr.getArguments();
				for (var i = 0; i < args.length; ++i) {
					onExpr(args[i], function (args, index) {
						return function (expr) {
							args[index] = expr;
						};
					}(args, i));
				}
				clearCache();
				return true;
			} else if (expr instanceof NewExpression) {
				// optimize the args, and clear
				var args = expr.getArguments();
				this.log("new expression");
				for (var i = 0; i < args.length; ++i) {
					onExpr(args[i], function (args, index) {
						return function (expr) {
							args[index] = expr;
						};
					}(args, i));
				}
				clearCache();
				return true;
			}
			// normal path
			if (expr instanceof PropertyExpression) {
				var cacheKey = getCacheKey(expr);
				if (cachedExprs[cacheKey]) {
					this.log("rewriting cse for: " + cacheKey);
					var replaceCachedExpr = cachedExprs[cacheKey][1];
					if (replaceCachedExpr) {
						// rewrite the first occurence of the expression and update cache entry
						var localVar = this.createVar(funcDef, cachedExprs[cacheKey][0].getType(), expr.getIdentifierToken().getValue());
						var localExpr = new LocalExpression(localVar.getName(), localVar);
						replaceCachedExpr(new AssignmentExpression(new Token("=", false), localExpr, cachedExprs[cacheKey][0]));
						registerCacheable(cacheKey, localExpr, null);
					}
					replaceCb(cachedExprs[cacheKey][0]);
				} else {
					registerCacheable(cacheKey, expr, replaceCb);
				}
			}
			// recursive
			return expr.forEachExpression(onExpr);
		}.bind(this);
		Util.forEachExpression(onExpr, exprs);
	}