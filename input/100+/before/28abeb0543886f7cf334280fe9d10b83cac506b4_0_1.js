function (funcDef, statements) {
		var statementIndex = 0;
		while (statementIndex < statements.length) {
			var exprsToOptimize = [];
			while (statementIndex < statements.length) {
				var statement = statements[statementIndex++];
				if (statement instanceof ExpressionStatement) {
					exprsToOptimize.push(statement.getExpr());
				} else if (statement instanceof ReturnStatement) {
					var expr = statement.getExpr();
					if (expr != null) {
						exprsToOptimize.push(statement.getExpr());
					}
					break;
				} else if (statement instanceof ContinuableStatement) {
					this._optimizeStatements(funcDef, statement.getStatements(), 0);
				} else {
					// FIXME add support for other types of statements (for example, IfStatement)
					// do nothing but continue
					break;
				}
			}
			// optimize basic block
			if (exprsToOptimize.length != 0) {
				this._optimizeExpressions(funcDef, exprsToOptimize);
			}
		}
	}