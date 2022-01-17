function (funcDef, exprs) {
		this.log("optimizing expressions starting");

		var cachedExprs = {};

		var getCacheKey = function (expr) {
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
		}.bind(this);

		var registerCacheable = function (key, expr, replaceCb) {
			this.log("registering lcse entry for: " + key);
			cachedExprs[key] = new _LCSECachedExpression(expr, replaceCb);
		}.bind(this);

		var clearCacheByLocalName = function (name) {
			this.log("clearing lcse entry for local name: " + name);
			for (var k in cachedExprs) {
				if (k.substring(0, name.length + 1) == name + ".") {
					this.log("  removing: " + k);
					delete cachedExprs[k];
				}
			}
		}.bind(this);

		var clearCacheByPropertyName = function (name) {
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
					clearCacheByLocalName(lhsExpr.getLocal().getName().getValue());
				} else if (lhsExpr instanceof PropertyExpression) {
					onExpr(lhsExpr.getExpr(), function (receiver) {
						return function (expr) {
							receiver.setExpr(expr);
						};
					}(lhsExpr));
					if (lhsExpr.getIdentifierToken().getValue() == "length") {
						// once we support caching array elements, we need to add special care
					} else {
						var cacheKey = getCacheKey(lhsExpr);
						if (cacheKey) {
							registerCacheable(cacheKey, lhsExpr, function (receiver) {
								return function (expr) {
									receiver.setFirstExpr(expr);
								}
							}(expr));
						}
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
			} else if (expr instanceof ConditionalExpression) {
				// only optimize the condExpr, then clear (for now)
				onExpr(expr.getCondExpr(), function (receiver) {
					return function (expr) {
						receiver.setCondExpr(expr);
					};
				}(expr));
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
				if (expr.getIdentifierToken().getValue() == "length") {
					// ditto as above comment for "length"
				} else {
					var cacheKey = getCacheKey(expr);
					if (cacheKey) {
						this.log("rewriting cse for: " + cacheKey);
						if (cachedExprs[cacheKey]) {
							replaceCb(
								cachedExprs[cacheKey].getLocalExpr(function (type, baseName) {
									var localVar = this.createVar(funcDef, type, baseName);
									return new LocalExpression(localVar.getName(), localVar);
								}.bind(this)
							).clone());
						} else {
							registerCacheable(cacheKey, expr, replaceCb);
						}
					}
				}
			}
			// recursive
			return expr.forEachExpression(onExpr);
		}.bind(this);
		Util.forEachExpression(onExpr, exprs);
	}