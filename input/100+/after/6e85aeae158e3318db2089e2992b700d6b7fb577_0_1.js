function onStatement(statement) {
			statement.forEachStatement(onStatement.bind(this));
			if (statement instanceof ForStatement) {
				var condExpr = statement.getCondExpr();
				var arrayLocal = condExpr != null ? this._hasLengthExprOfLocalArray(condExpr) : null;
				if (arrayLocal != null) {
					if (this._lengthIsUnmodifiedInExpr(statement.getCondExpr())
						&& this._lengthIsUnmodifiedInExpr(statement.getPostExpr())
						&& statement.forEachStatement(this._lengthIsUnmodifiedInStatement.bind(this))) {
						// optimize!
						this.log(_Util.getFuncName(funcDef) + " optimizing .length at line " + statement.getToken().getLineNumber());
						// create local
						var lengthLocal = this.createVar(funcDef, Type.integerType, arrayLocal.getName().getValue() + "$len");
						// assign to the local
						statement.setInitExpr(
							new CommaExpression(
								new Token(",", false),
								statement.getInitExpr(),
								new AssignmentExpression(
									new Token("=", false),
									new LocalExpression(new Token(lengthLocal.getName(), true), lengthLocal),
									new PropertyExpression(
										new Token(".", false),
										new LocalExpression(new Token(arrayLocal.getName(), true), arrayLocal),
										new Token("length", true),
										lengthLocal.getType()))));
						// rewrite
						var onExpr = function (expr, replaceCb) {
							if (expr instanceof PropertyExpression
								&& expr.getIdentifierToken().getValue() == "length"
								&& expr.getExpr() instanceof LocalExpression
								&& expr.getExpr().getLocal() == arrayLocal) {
								replaceCb(new LocalExpression(new Token(lengthLocal.getName(), true), lengthLocal));
							} else {
								expr.forEachExpression(onExpr.bind(this));
							}
							return true;
						}.bind(this);
						statement.getCondExpr().forEachExpression(onExpr);
						statement.getPostExpr().forEachExpression(onExpr);
						statement.forEachStatement(function onStatement(statement) {
							statement.forEachStatement(onStatement.bind(this));
							statement.forEachExpression(onExpr);
							return true;
						}.bind(this));
					}
				}
			}
			return true;
		}