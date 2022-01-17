function () {
				// redundant if..
				if (arguments.length !== 1) {
					throw '\'if\' requires condition';
				}
				if (arguments[0] === true) {
					return evaluate(copyList(thenExpression));
				}
				else if (elseExpression) {
					return evaluate(copyList(elseExpression));
				}
				return 'null';
			}