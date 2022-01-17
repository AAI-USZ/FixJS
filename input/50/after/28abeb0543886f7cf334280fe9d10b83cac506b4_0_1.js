function (key, expr, replaceCb) {
			this.log("registering lcse entry for: " + key);
			cachedExprs[key] = new _LCSECachedExpression(expr, replaceCb);
		}