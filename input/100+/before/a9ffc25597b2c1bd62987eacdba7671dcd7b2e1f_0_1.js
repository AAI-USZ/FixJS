function (member) {
			if ((member.flags() & (ClassDefinition.IS_STATIC | ClassDefinition.IS_ABSTRACT)) == 0) {
				if (initProperties[member.name()]) {
					var stmt = new Statement.ExpressionStatement(
						new Expression.AssignmentExpression(new Parser.Token("=", false),
							new Expression.PropertyExpression(new Parser.Token(".", false),
								new Expression.ThisExpression(new Parser.Token("this", false), new Type.ObjectType(this._classDef)),
								member.getNameToken(), member.getType()),
							member.getInitialValue()));
					this._statements.splice(insertStmtAt++, 0, stmt);
				}
			}
			return true;
		}