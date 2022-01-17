function () {
				// redundant if..
				if (arguments.length !== 1) {
					throw '\'if\' requires condition';
				}
				if (arguments[0] === true) {
					return evaluate(thenExpression);
				}
				else if (elseExpression) {
					return evaluate(elseExpression);
				}
				return 'null';
			}